import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Producto} from '../../../interfaces/producto.interface';
import {Vendedor} from '../../../interfaces/vendedor.interface';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {ReportesService} from '../../../services/reportes/reportes.service';
import {ProductosService} from '../../../services/producto/productos.service';
import {VendedorService} from '../../../services/vendedor/vendedor.service';
import * as moment from 'moment';
import swal from 'sweetalert';

@Component({
  selector: 'app-reporte-ganancias',
  templateUrl: './reporte-ganancias.component.html',
  styleUrls: ['./reporte-ganancias.component.css']
})
export class ReporteGananciasComponent implements OnInit {

  form: FormGroup;
  productos: Producto[] = [];
  vendedores: Vendedor[] = [];
  filteredOptions: Observable<any>;
  isLoadingResults = false;


  constructor(public _reportesService: ReportesService,
              public _productoService: ProductosService,
              public _vendedorService: VendedorService,
              private domSanitizer: DomSanitizer) {
    this._productoService.getAll()
      .subscribe(
        (res: Producto[]) => {
          this.productos = res;
          console.log(res);
        }
      );
    this._vendedorService.getVendedores()
      .subscribe(
        (res: Vendedor[]) => {
          this.vendedores = res;
        }
      );
    this.createFormGroup();
  }

  ngOnInit() {
  }

  reset() {
    this.createFormGroup();
  }

  createFormGroup() {
    this.form = new FormGroup({
      'fecha_inicio': new FormControl(),
      'fecha_fin': new FormControl(),
      'libro': new FormControl(),
      'vendedor': new FormControl(),
      'tipo_pedido': new FormControl()
    });

    this.filteredOptions = this.form.get('libro').valueChanges
      .pipe(
        startWith<string | Producto>(''),
        map(value => typeof value === 'string' ? value : value.titulo),
        map(nombre => nombre ? this.filterBook(nombre) : this.productos.slice())
      );
  }

  filterBook(titulo: string): Producto[] {
    return this.productos.filter(option =>
      option.titulo.toLowerCase().indexOf(titulo.toLowerCase()) === 0);
  }

  displayBookFn(book?: Producto): string | undefined {
    return book ? book.titulo : undefined;
  }

  reporteVenta() {
    this.isLoadingResults = true;
    console.log(this.form.value);
    let pdfResult;
    let libro;
    let fecha_inicio;
    let fecha_fin;
    const vendedor = this.form.get('vendedor').value;
    const tipo_pedido = this.form.get('tipo_pedido').value;
    this.form.get('fecha_inicio').value ? fecha_inicio = moment(this.form.get('fecha_inicio').value).format('YYYY-MM-D') :
      fecha_inicio = null;
    this.form.get('fecha_fin').value ? fecha_fin = moment(this.form.get('fecha_fin').value).format( 'YYYY-MM-D') :
      fecha_fin = null;
    this.form.get('libro').value ? libro = this.form.get('libro').value : libro = null;
    const params = {
      'fecha_inicio': fecha_inicio,
      'fecha_fin': fecha_fin,
      'libro': libro ? libro.claveProducto : null,
      'vendedor': vendedor,
      'tipo_pedido': tipo_pedido
    };
    this._reportesService.reporteGanancia(params).subscribe(
      (data: any) => {
        this.isLoadingResults = false;
        console.log(data);
        pdfResult = this.domSanitizer.bypassSecurityTrustResourceUrl(
          URL.createObjectURL(data)
        );
        window.open(pdfResult.changingThisBreaksApplicationSecurity);
        console.log(pdfResult);
      },
      (error) => {
        swal('Error al cargar el reporte', 'Algo ha salido mal', 'error');
        console.error(error);
        this.isLoadingResults = false;
      }
    );
  }
}
