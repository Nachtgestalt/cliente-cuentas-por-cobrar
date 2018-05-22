import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {VendedorService} from '../../services/vendedor/vendedor.service';
import {Vendedor} from '../../interfaces/vendedor.interface';
import 'rxjs/add/operator/takeWhile';
import {Zona} from '../../interfaces/zona.interface';
import {ZonaService} from '../../services/zona/zona.service';
import {EscuelaService} from '../../services/escuela/escuela.service';
import {Escuela} from '../../interfaces/escuela.interface';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {Maestro} from '../../interfaces/maestro.interface';
import {Venta} from '../../interfaces/venta.interface';
import {TemporadaService} from '../../services/temporada/temporada.service';
import {FolioService} from '../../services/folio/folio.service';
import {MY_FORMATS} from '../../dialogs/add-temporada/add-temporada.dialog.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {Producto} from '../../interfaces/producto.interface';
import {ProductosService} from '../../services/producto/productos.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ],
})
export class VentasComponent implements OnInit, OnDestroy {
  zonas: Zona[] = [];
  forma: FormGroup;
  vendedores: Vendedor[];
  escuelas: Escuela[];
  maestros: Maestro[];
  productos: Producto[] = [];
  isAlive = true;
  venta: Venta = {
    comision_director: null,
    vendedor_clave: '',
    comision_profesor: null,
    comision_vendedor: null,
    escuela_clave: '',
    fecha: '',
    folio: '',
    idfolios: null,
    idprofesor: ''
  };

  vendedorFlag = false;
  ventaFlag = false;
  escuelaFlag = false;
  comisionesFlag = false;
  pedidosFlag = false;

  countBooks = 0;

  reciboVenta;

  currentSeason;
  filteredOptions: Observable<Escuela[]>;

  filteredOptionsProducto: Observable<Producto[]>[] = [];

  constructor( private _vendedorService: VendedorService,
               private _zonaService: ZonaService,
               private _escuelaService: EscuelaService,
               private _folioService: FolioService,
               private _productoService: ProductosService,
               private cdref: ChangeDetectorRef,
               private formBuilder: FormBuilder) {

    this.currentSeason = JSON.parse(localStorage.getItem('season'));

    this._zonaService.getZonas()
      .takeWhile(() => this.isAlive)
      .subscribe( (res: Zona[]) => {
        this.zonas = res;
        console.log(this.zonas);
      });

    this._vendedorService.getVendedores()
      .takeWhile(() => this.isAlive)
      .subscribe( (res: Vendedor[]) => {
        this.vendedores = res;
      });

    this._productoService.getAll()
      .subscribe(
        (res: Producto[]) => {
          this.productos = res;
          console.log(res);
        }
      );

    // this._folioService.getFoliosTemporada(this.currentSeason.idtemporada)
    //   .subscribe(
    //     res => {
    //       console.log(res);
    //       this.reciboVenta = res[1];
    //       this.venta.idfolios = res[1].idfolios;
    //     }
    //   );
  }

  ngOnInit() {
    this.crearForma();
    this.createValueChanges();
  }

  createValueChanges() {
    this.isAlive = true;
    this.forma.get('zona').valueChanges
      .takeWhile(() => this.isAlive)
      .subscribe( values => {
        console.log(values);
        this.resetFormAfterChangeZone();
        this.setFormValuesAfterChangeZone(values);
        // Al tener elegida la zona cargamos la lista de escuelas que pertenecen
        this._escuelaService.getEscuelasZona(values.idzona)
          .takeWhile(() => this.isAlive)
          .subscribe((res: Escuela[]) => {
            this.escuelas = res;
            this.filteredOptions = this.forma.get('escuela').valueChanges
              .pipe(
                startWith<string | Escuela>(''),
                map(value => typeof value === 'string' ? value : value.nombre),
                map(nombre => nombre ? this.filterSchool(nombre) : this.escuelas.slice())
              );
            console.log(res);
            console.log(this.escuelas);
          });
      });

    this.forma.get('escuela').valueChanges
      .subscribe( values => {
        console.log(values);
        if (values !== null) {
          this.venta.escuela_clave = values.clave;
          this.maestros = values.profesores;
          console.log(this.maestros);
        }
      });

    this.forma.get('maestro').valueChanges
      .subscribe( values => {
        console.log(values);
        this.venta.idprofesor = values.idprofesor;
        this.comisionesFlag = true;
        this.pedidosFlag = true;
        // console.log(this.venta);
      });

    this.forma.get('folio').valueChanges
      .subscribe( values => {
        if (values !== null) {
          this.escuelaFlag = true;
        }
      });
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  resetFormAfterChangeZone() {
    this.forma.get('clave').patchValue('');
    this.forma.get('vendedor').patchValue('');
    this.forma.get('escuela').patchValue('');
    this.escuelas = [];
    this.maestros = [];
  }

  crearForma() {
    this.forma = new FormGroup({
      'vendedor': new FormControl(),
      'zona': new FormControl(),
      'clave': new FormControl(),
      'escuela': new FormControl(),
      'maestro': new FormControl(),
      'folio': new FormControl(),
      'fecha': new FormControl(),
      'pedidos': new FormArray([this.createItem()])
    });

    this.filteredOptionsProducto[0] = this.forma.get('pedidos.0').get('title').valueChanges
      .pipe(
        startWith<string | Producto>(''),
        map(value => typeof value === 'string' ? value : value.titulo),
        map(nombre => nombre ? this.filterBook(nombre) : this.productos.slice())
      );

    this.forma.get('pedidos.0').get('title').valueChanges.subscribe(
      res => {
        console.log(res)
        this.forma.get('pedidos.0').get('price').setValue(res.precio);
      }
    );

    this.forma.get('pedidos.0').get('amount').valueChanges.subscribe(
      (res: any) => {
        const precio: any = Number(this.forma.get('pedidos.0').get('price').value);
        this.forma.get('pedidos.0').get('total').setValue( precio * res );
      }
    );

    this.forma.get('pedidos.0').get('price').valueChanges.subscribe(
      (res: any) => {
        const precio: any = Number(this.forma.get('pedidos.0').get('amount').value);
        this.forma.get('pedidos.0').get('total').setValue( precio * res );
      }
    );

    //
    // this.filteredOptionsProducto[0].subscribe(
    //   res => {
    //     console.log(res);
    //     if (res.length !== 0 ) {
    //       this.forma.get('pedidos.0').get('price').setValue(res[0].precio);
    //     }
    //   }
    // );
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      title: '',
      amount: '',
      price: '',
      total: '',
    });
  }

  filterSchool(nombre: string): Escuela[] {
    return this.escuelas.filter(option =>
      option.clave.toLowerCase().indexOf(nombre.toLowerCase()) === 0);
  }

  displayFn(escuela?: Escuela): string | undefined {
    return escuela ? escuela.nombre : undefined;
  }

  filterBook(titulo: string): Producto[] {
    return this.productos.filter(option =>
      option.titulo.toLowerCase().indexOf(titulo.toLowerCase()) === 0);
  }

  displayBookFn(book?: Producto): string | undefined {
    return book ? book.titulo : undefined;
  }

  confirmSell() {
  }

  private setFormValuesAfterChangeZone(vendedor: any) {
    this.vendedorFlag = true;
    this.ventaFlag = true;
    this.venta.vendedor_clave = vendedor.vendedor.clave;
    this.forma.get('vendedor').patchValue(vendedor.vendedor.nombre + ' ' + vendedor.vendedor.apellidos);
    this.forma.get('clave').patchValue(vendedor.vendedor.clave);
    this.cdref.detectChanges();
  }

  addNewBook() {
    const control = <FormArray>this.forma.controls['pedidos'];
    control.push(this.createItem());
    console.log(control.length);

    this.cdref.detectChanges();

    this.filteredOptionsProducto[control.length - 1] = this.forma.get(`pedidos.${control.length - 1}`).get('title').valueChanges
      .pipe(
        startWith<string | Producto>(''),
        map(value => typeof value === 'string' ? value : value.titulo),
        map(nombre => nombre ? this.filterBook(nombre) : this.productos.slice())
      );

    this.forma.get(`pedidos.${control.length - 1}`).get('title').valueChanges.subscribe(
      res => {
        console.log(res)
        this.forma.get(`pedidos.${control.length - 1}`).get('price').setValue(res.precio);
      }
    );

    this.forma.get(`pedidos.${control.length - 1}`).get('amount').valueChanges.subscribe(
      (res: any) => {
        const precio: any = Number(this.forma.get('pedidos.0').get('price').value);
        this.forma.get(`pedidos.${control.length - 1}`).get('total').setValue( precio * res );
      }
    );

    this.forma.get(`pedidos.${control.length - 1}`).get('price').valueChanges.subscribe(
      (res: any) => {
        const precio: any = Number(this.forma.get('pedidos.0').get('amount').value);
        this.forma.get(`pedidos.${control.length - 1}`).get('total').setValue( precio * res );
      }
    );
  }

  deleteBook(index) {
    // control refers to your formarray
    const control = <FormArray>this.forma.controls['pedidos'];
    // remove the chosen row
    control.removeAt(index);
  }
}
