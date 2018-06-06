import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Producto} from '../../interfaces/producto.interface';
import {ProductosService} from '../../services/producto/productos.service';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AddTemporadaComponent} from '../add-temporada/add-temporada.dialog.component';
import {Venta} from '../../interfaces/venta.interface';
import {VentaService} from '../../services/venta/venta.service';
import {HistorialVentaService} from '../../services/historial-venta/historial-venta.service';
import {HistorialVenta} from '../../interfaces/historialVennta.interface';

@Component({
  selector: 'app-venta-resurtido',
  templateUrl: './venta-resurtido.component.html',
  styleUrls: ['./venta-resurtido.component.css']
})
export class VentaResurtidoComponent implements OnInit {
  forma: FormGroup;

  isAlive = true;
  mensajeDialog = '';

  productos: Producto[] = [];
  filteredOptionsProducto: Observable<Producto[]>[] = [];
  historialVenta: HistorialVenta[] = [];

  venta: Venta;
  //   {
  //   escuela: null,
  //   comision_director: null,
  //   vendedor_clave: '',
  //   comision_profesor: null,
  //   comision_vendedor: null,
  //   escuela_clave: '',
  //   fecha: '',
  //   folio: '',
  //   idfolios: null,
  //   idprofesor: '',
  //   pedidos: [
  //     {
  //       libro_clave: null,
  //       idHistorial: null,
  //       pedidos: null
  //     }
  //   ]
  // };
  constructor(private _productoService: ProductosService,
              private _ventaService: VentaService,
              private _historialVenta: HistorialVentaService,
              private formBuilder: FormBuilder,
              private cdref: ChangeDetectorRef,
              public dialogRef: MatDialogRef<AddTemporadaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data.resurtido);

    this.data.resurtido ? this.mensajeDialog = 'RESURTIDO' : this.mensajeDialog = 'DEVOLUCION';

    this._productoService.getAll()
      .takeWhile(() => this.isAlive)
      .subscribe(
        (res: Producto[]) => {
          this.productos = res;
          console.log(res);
        }
      );

    this._ventaService.getVenta(this.data.folio)
      .takeWhile(() => this.isAlive)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.venta = res;
          console.log(this.venta);
        }
      );

    this._historialVenta.getHistorialXFolio(this.data.folio)
      .subscribe(
        res => {
          console.log(res);
        }
      );
  }

  ngOnInit() {
    this.crearForma();
  }

  crearForma() {
    this.forma = new FormGroup({
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
      title: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      price: '',
      total: '',
    });
  }

  filterBook(titulo: string): Producto[] {
    return this.productos.filter(option =>
      option.titulo.toLowerCase().indexOf(titulo.toLowerCase()) === 0);
  }

  displayBookFn(book?: Producto): string | undefined {
    return book ? book.titulo : undefined;
  }

  addNewBook() {
    const control = <FormArray>this.forma.controls['pedidos'];
    control.push(this.createItem());
    console.log(control.length);

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
          const precio: any = Number(this.forma.get(`pedidos.${control.length - 1}`).get('price').value);
          this.forma.get(`pedidos.${control.length - 1}`).get('total').setValue(precio * res);
        }
      );

    this.forma.get(`pedidos.${control.length - 1}`).get('price').valueChanges
      .takeWhile(() => this.isAlive)
      .subscribe(
        (res: any) => {
          const precio: any = Number(this.forma.get(`pedidos.${control.length - 1}`).get('amount').value);
          this.forma.get(`pedidos.${control.length - 1}`).get('total').setValue(precio * res);
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

  confirmAdd() {
    console.log(this.forma.value);
    let control = this.forma.controls['pedidos'].value;
    for (let pedido of control) {
      console.log(pedido);
      if (!this.data.resurtido) {
        pedido.amount = pedido.amount * -1;
      }
      if (this.data.resurtido) {
        this.historialVenta.push(
          {
            idHistorial: null,
            entregados: 0,
            fecha_confirmacion: null,
            fecha_solicitud: null,
            libro_clave: pedido.title.clave_producto,
            motivo: 'RESURTIDO',
            tipo_movimiento: 'SALIDA',
            pedidos: pedido.amount,
            venta_folio: this.data.folio,
            precioventa: pedido.price
          }
        );
      } else {
        this.historialVenta.push(
          {
            idHistorial: null,
            entregados: 0,
            fecha_confirmacion: null,
            fecha_solicitud: null,
            libro_clave: pedido.title.clave_producto,
            motivo: 'DEVOLUCION',
            tipo_movimiento: 'ENTRADA',
            pedidos: pedido.amount,
            venta_folio: this.data.folio,
            precioventa: pedido.price
          }
        );
      }
    }
    console.log(this.historialVenta);
    this._ventaService.postResurtido(this.historialVenta, this.data.folio)
      .subscribe(
        res => {
          this.dialogRef.close(true);
          console.log(res);
        },
        error => {
          this.dialogRef.close(false);
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
