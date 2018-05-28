import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {VentaService} from '../../services/venta/venta.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AddTemporadaComponent, MY_FORMATS} from '../add-temporada/add-temporada.dialog.component';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {Escuela} from '../../interfaces/escuela.interface';
import {startWith} from 'rxjs/operators/startWith';
import {Producto} from '../../interfaces/producto.interface';
import {map} from 'rxjs/operators/map';
import {takeWhile} from 'rxjs/operators/takeWhile';
import {Observable} from 'rxjs/Observable';
import {EscuelaService} from '../../services/escuela/escuela.service';
import {Maestro} from '../../interfaces/maestro.interface';
import {Venta} from '../../interfaces/venta.interface';

@Component({
  selector: 'app-edit-pedido',
  templateUrl: './edit-pedido.dialog.component.html',
  styleUrls: ['./edit-pedido.dialog.component.css'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ],
})
export class EditPedidoDialogComponent implements OnInit {
  forma: FormGroup;
  filteredOptions: Observable<Escuela[]>;
  escuelas: Escuela[];
  maestros: Maestro[];
  venta;
  isAlive = true;

  constructor(public dialogRef: MatDialogRef<AddTemporadaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _ventaService: VentaService,
              private _escuelaService: EscuelaService) {

    this.createForm();
    this.forma.get('escuela').valueChanges
      .takeWhile(() => this.isAlive)
      .subscribe(values => {
        console.log(values);
        if (values !== null) {
          this.maestros = values.profesores;
          // console.log(this.maestros);
        }
      });

    this._ventaService.getVenta(data.folio)
      .subscribe(
        res => {
          this.venta = res;
          this._escuelaService.getEscuelasZona(res.zona)
            .subscribe(
              (respuesta: Escuela[]) => {
                this.escuelas = respuesta;
                this.filteredOptions = this.forma.get('escuela').valueChanges
                  .pipe(
                    startWith<string | Escuela>(''),
                    map(value => typeof value === 'string' ? value : value.nombre),
                    map(nombre => nombre ? this.filterSchool(nombre) : this.escuelas.slice())
                  );
                console.log(respuesta);
              }
            );
          this.forma.setValue(res);
          console.log(this.venta);
          console.log(res);
        }
      );
  }

  ngOnInit() {
  }

  createForm() {
    this.forma = new FormGroup({
      'vendedor': new FormControl(),
      'zona': new FormControl(),
      'vendedor_clave': new FormControl(),
      'escuela': new FormControl(),
      'maestro': new FormControl(),
      'folio': new FormControl('', [Validators.required]),
      'fecha': new FormControl(),
      'comision_profesor': new FormControl(),
      'comision_vendedor': new FormControl(),
      'comision_director': new FormControl(),
      'idfolios': new FormControl(),
    });
  }

  filterSchool(nombre: string): Escuela[] {
    return this.escuelas.filter(option =>
      option.clave.toLowerCase().indexOf(nombre.toLowerCase()) === 0);
  }

  displayFn(escuela?: Escuela): string | undefined {
    return escuela ? escuela.nombre : undefined;
  }

  confirmAdd() {
    this.isAlive = false;
    let maestro = this.forma.get('maestro').value;
    let escuela = this.forma.get('escuela').value;
    let venta: any = this.forma.value;
    delete venta.maestro;
    delete venta.escuela;
    venta.idprofesor = maestro.idprofesor;
    venta.escuela_clave = escuela.clave;
    console.log(venta);
    this._ventaService.putVenta(venta)
      .subscribe(res => {
        console.log(res);
        this.dialogRef.close(true);
        },
        error1 => {
          swal('Algo malo ha ocurrido', 'Error con el servidor', 'error');
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
