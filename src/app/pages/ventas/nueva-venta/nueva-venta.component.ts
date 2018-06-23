import {ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MY_FORMATS} from '../../../dialogs/add-temporada/add-temporada.dialog.component';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {Venta} from '../../../interfaces/venta.interface';
import {Escuela} from '../../../interfaces/escuela.interface';
import {startWith} from 'rxjs/operators/startWith';
import {ZonaService} from '../../../services/zona/zona.service';
import {Producto} from '../../../interfaces/producto.interface';
import {Zona} from '../../../interfaces/zona.interface';
import {FolioService} from '../../../services/folio/folio.service';
import {ProductosService} from '../../../services/producto/productos.service';
import {VendedorService} from '../../../services/vendedor/vendedor.service';
import {EscuelaService} from '../../../services/escuela/escuela.service';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Moment} from 'moment';
import {DomSanitizer} from '@angular/platform-browser';
import {BloqueFoliosService} from '../../../services/bloque-folios/bloque-folios.service';
import {Vendedor} from '../../../interfaces/vendedor.interface';
import {VentaService} from '../../../services/venta/venta.service';
import {map} from 'rxjs/operators/map';
import {Observable} from 'rxjs/Observable';
import {Maestro} from '../../../interfaces/maestro.interface';

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrls: ['./nueva-venta.component.css'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ],
})
export class NuevaVentaComponent implements OnInit, OnDestroy {
  active = true;
  isValid = false;

  zonas: Zona[] = [];
  forma: FormGroup;
  vendedores: Vendedor[];
  escuelas: Escuela[];
  maestros: Maestro[];
  productos: Producto[] = [];
  isAlive = true;
  venta: Venta = {
    profesor: '',
    escuela: null,
    comision_director: null,
    vendedor_clave: '',
    comision_profesor: null,
    comision_vendedor: null,
    escuela_clave: '',
    fecha: '',
    folio: '',
    idfolios: null,
    idprofesor: '',
    pedidos: [
      {
        libro_clave: null,
        idHistorial: null,
        pedidos: null,
        precioventa: null,
        tipo_movimiento: '',
        motivo: ''
      }
    ]
  };

  vendedorFlag = false;
  ventaFlag = false;
  escuelaFlag = false;
  comisionesFlag = false;
  pedidosFlag = false;
  showPDF = false;

  countBooks = 0;

  reciboVenta;

  currentSeason;
  filteredOptions: Observable<Escuela[]>;

  filteredOptionsProducto: Observable<Producto[]>[] = [];
  pdfResult;

  constructor(private _vendedorService: VendedorService,
              private _zonaService: ZonaService,
              private _escuelaService: EscuelaService,
              private _folioService: FolioService,
              private _productoService: ProductosService,
              private _ventaService: VentaService,
              private _bloqueFoliosService: BloqueFoliosService,
              private cdref: ChangeDetectorRef,
              private formBuilder: FormBuilder,
              private domSanitizer: DomSanitizer,
              private renderer: Renderer2) {

    this.currentSeason = JSON.parse(localStorage.getItem('season'));

    localStorage.getItem('season') !== null ? this.isValid = true : this.isValid = false;

    if (this.isValid) {
      this._zonaService.getZonas()
        .takeWhile(() => this.isAlive)
        .subscribe((res: Zona[]) => {
          this.zonas = res;
          console.log(this.zonas);
        });

      this._vendedorService.getVendedores()
        .takeWhile(() => this.isAlive)
        .subscribe((res: Vendedor[]) => {
          this.vendedores = res;
        });

      this._productoService.getAll()
        .takeWhile(() => this.isAlive)
        .subscribe(
          (res: Producto[]) => {
            this.productos = res;
            console.log(res);
          }
        );

      this._folioService.getFoliosTemporada(this.currentSeason.idtemporada)
        .takeWhile(() => this.isAlive)
        .subscribe(
          res => {
            console.log(res);
            this.reciboVenta = res[1];
            this.venta.idfolios = res[1].idfolios;
          }
        );
    }
  }

  ngOnInit() {
    this.crearForma();
    this.createValueChanges();
  }

  createValueChanges() {
    this.forma.get('zona').valueChanges
      .takeWhile(() => this.isAlive)
      .subscribe(values => {
        console.log(values);
        this.resetFormAfterChangeZone();
        this.setFormValuesAfterChangeZone(values);
        this.forma.get('folio')
          .setAsyncValidators(Validators.composeAsync([this.validarFolio.bind(this), this.validarFolioEnRango.bind(this)]));
        // this.forma.get('fecha')
        //   .setValidators(this.validarFechaValida);
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
      .takeWhile(() => this.isAlive)
      .subscribe(values => {
        console.log(values);
        if (values !== null) {
          this.venta.escuela_clave = values.clave;
          this.maestros = values.profesores;
          console.log(this.maestros);
        }
      });

    this.forma.get('maestro').valueChanges
      .takeWhile(() => this.isAlive)
      .subscribe(values => {
        console.log(values);
        this.venta.idprofesor = values.idprofesor;
        this.comisionesFlag = true;
        this.pedidosFlag = true;
        // console.log(this.venta);
      });

    this.forma.get('folio').valueChanges
      .takeWhile(() => this.isAlive)
      .subscribe(values => {
        console.log(this.forma.get('folio'));
        if (values !== null) {
          this.venta.folio = values;
          this.escuelaFlag = true;
        }
      });
  }

  ngOnDestroy() {
    console.log('ESTOY EN EL ONDESTROY!!');
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
      'folio': new FormControl('', [Validators.required]),
      'fecha': new FormControl(),
      'comision_profesor': new FormControl(),
      'comision_vendedor': new FormControl(),
      'comision_director': new FormControl(),
      'pedidos': new FormArray([this.createItem()])
    });

    this.filteredOptionsProducto[0] = this.forma.get('pedidos.0').get('title').valueChanges
      .pipe(
        startWith<string | Producto>(''),
        map(value => typeof value === 'string' ? value : value.titulo),
        map(nombre => nombre ? this.filterBook(nombre) : this.productos.slice())
      );

    this.forma.get('pedidos.0').get('title').valueChanges
      .takeWhile(() => this.isAlive)
      .subscribe(
        res => {
          console.log(res);
          this.forma.get('pedidos.0').get('price').setValue(res.precio);
        }
      );

    this.forma.get('pedidos.0').get('amount').valueChanges
      .takeWhile(() => this.isAlive)
      .subscribe(
        (res: any) => {
          const precio: any = Number(this.forma.get('pedidos.0').get('price').value);
          this.forma.get('pedidos.0').get('total').setValue(precio * res);
        }
      );

    this.forma.get('pedidos.0').get('price').valueChanges
      .takeWhile(() => this.isAlive)
      .subscribe(
        (res: any) => {
          const precio: any = Number(this.forma.get('pedidos.0').get('amount').value);
          this.forma.get('pedidos.0').get('total').setValue(precio * res);
        }
      );
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      title: '',
      amount: ['', [Validators.required, Validators.min(1)]],
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
    // let tab = window.open();
    const control = this.forma.controls['pedidos'].value;
    const fechaForm: Moment = this.forma.get('fecha').value;
    const fecha = fechaForm.format('YYYY[-]MM[-]DD');
    this.venta.pedidos.pop();
    for (const pedido of control) {
      console.log(pedido);
      this.venta.pedidos.push(
        {
          idHistorial: null,
          libro_clave: pedido.title.claveProducto,
          pedidos: pedido.amount,
          precioventa: pedido.price,
          motivo: 'SALIDA POR VENTA',
          tipo_movimiento: 'SALIDA'
        }
      );
    }
    this.venta.fecha = fecha;
    this.venta.comision_vendedor = this.forma.get('comision_vendedor').value;
    this.venta.comision_profesor = this.forma.get('comision_profesor').value;
    this.venta.comision_director = this.forma.get('comision_director').value;

    console.log(this.venta);
    this._ventaService.postVenta(this.venta)
      .takeWhile(() => this.isAlive)
      .subscribe(
        res => {
          console.log(res);
        },
        error1 => {
          swal('Error al realizar la venta', 'Algo ha salido mal', 'error');
        },
        () => {
          swal('Venta realizada', 'Venta realizada con exito', 'success')
            .then((value) => {
              this._ventaService.getPFDVenta(this.venta.folio)
                .takeWhile(() => this.isAlive)
                .subscribe(
                  (data: any) => {
                    console.log(data);
                    // var fileURL = URL.createObjectURL(data);
                    // window.open(fileURL, 'reporte de venta');
                    this.pdfResult = this.domSanitizer.bypassSecurityTrustResourceUrl(
                      URL.createObjectURL(data)
                    );
                    window.open(this.pdfResult.changingThisBreaksApplicationSecurity);
                    console.log(this.pdfResult);
                    this.active = false;
                    this.vendedorFlag = false;
                    this.ventaFlag = false;
                    this.escuelaFlag = false;
                    this.comisionesFlag = false;
                    this.pedidosFlag = false;
                    this.showPDF = false;
                    this.cdref.detectChanges();
                    this.isAlive = false;
                  },
                  error1 => {
                    swal('Algo ha salido mal', 'Error al generar reporte de venta', 'error');
                  },
                  () => {
                    console.log('Todo ha salido OK!!');
                    this.isAlive = false;
                    // this.forma.reset();
                    setTimeout(() => {
                      this.crearForma();
                      this.createValueChanges();
                      this.active = true;
                      this.isAlive = true;
                    }, 1000);
                  }
                );
            });
        }
      );
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
    const index = control.length - 1;

    this.filteredOptionsProducto[control.length - 1] = this.forma.get(`pedidos.${control.length - 1}`).get('title').valueChanges
      .pipe(
        startWith<string | Producto>(''),
        map(value => typeof value === 'string' ? value : value.titulo),
        map(nombre => nombre ? this.filterBook(nombre) : this.productos.slice())
      );

    this.forma.get(`pedidos.${control.length - 1}`).get('title').valueChanges
      .takeWhile(() => this.isAlive)
      .subscribe(
        res => {
          console.log(res);
          this.forma.get(`pedidos.${control.length - 1}`).get('price').setValue(res.precio);
        }
      );

    this.forma.get(`pedidos.${control.length - 1}`).get('amount').valueChanges
      .takeWhile(() => this.isAlive)
      .subscribe(
        (res: any) => {
          const precio: any = Number(this.forma.get(`pedidos.${index}`).get('price').value);
          this.forma.get(`pedidos.${index}`).get('total').setValue(precio * res);
        }
      );

    this.forma.get(`pedidos.${control.length - 1}`).get('price').valueChanges
      .takeWhile(() => this.isAlive)
      .subscribe(
        (res: any) => {
          const cantidad: any = Number(this.forma.get(`pedidos.${index}`).get('amount').value);
          this.forma.get(`pedidos.${index}`).get('total').setValue(cantidad * res);
        }
      );

    this.cdref.detectChanges();
  }

  deleteBook(index) {
    // control refers to your formarray
    const control = <FormArray>this.forma.controls['pedidos'];
    // remove the chosen row
    control.removeAt(index);
    // console.log(control);
  }

  validarFolio(control: AbstractControl) {
    return this._ventaService.folioAsignadoVenta(control.value)
      .map(res => {
        console.log('Folio asignado: ', res);
        return res ? {folioexiste: true} : null;
      });
  }

  validarFolioEnRango(control: AbstractControl) {
    return this._bloqueFoliosService.folioInRange(this.venta.vendedor_clave, control.value)
      .map(res => {
        console.log('Folio en rango: ', res);
        return res ? null : {folioExisteEnRango: true};
      });
  }

  // validarFechaValida(control: AbstractControl) {
  //   // const fechaForm: Moment = control.value;
  //   // const fecha = fechaForm.format('YYYY[-]MM[-]DD');
  //   const date: Moment = moment(control.value);
  //   console.log(date.isValid());
  //   return date.isValid() ? null : {fechaInvalida: true};
  // }
}
