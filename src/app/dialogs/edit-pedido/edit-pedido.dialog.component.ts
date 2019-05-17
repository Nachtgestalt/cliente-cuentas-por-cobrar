import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {VentaService} from '../../services/venta/venta.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AddTemporadaComponent, MY_FORMATS} from '../add-temporada/add-temporada.dialog.component';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {Escuela} from '../../interfaces/escuela.interface';
import {startWith} from 'rxjs/operators/startWith';
import {map, takeWhile, takeUntil} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {EscuelaService} from '../../services/escuela/escuela.service';
import {Maestro} from '../../interfaces/maestro.interface';

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
export class EditPedidoDialogComponent implements OnInit, OnDestroy {
  forma: FormGroup;
  filteredOptions: Observable<Escuela[]>;
  escuelas: Escuela[];
  maestros: Maestro[];
  venta;
  isAlive = true;

  constructor(public dialogRef: MatDialogRef<AddTemporadaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private _ventaService: VentaService,
              private _escuelaService: EscuelaService) {

    this.createForm();
    this.forma.get('escuela').valueChanges
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
            .takeWhile(() => this.isAlive)
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
          this.setData2Form(res);
        }
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('Estoy en el OnDestroy!');
    this.isAlive = false;
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
      'lideres': new FormArray([]),
      'idfolios': new FormControl(),
    });
  }

  createLider(): FormGroup {
    return this.formBuilder.group({
      lider: ['', [Validators.required]],
      comision_lider: ['', Validators.required]
    });
  }

  setData2Form(data) {
    const lideres = this.forma.get('lideres') as FormArray;
    while (lideres.length) {
      lideres.removeAt(0);
    }
    for (let i = 0; i < data.lideres.length; i++) {
      this.addNewLider();
    }
    console.log(data);
    this.forma.setValue(data);

  }

  addNewLider() {
    const control = <FormArray>this.forma.controls['lideres'];
    control.push(this.createLider());
  }

  deleteLider(index) {
    // control refers to your formarray
    const control = <FormArray>this.forma.controls['lideres'];
    // remove the chosen row
    control.removeAt(index);
    // console.log(control);
  }

  filterSchool(nombre: string): Escuela[] {
    return this.escuelas.filter(option =>
      option.clave.toLowerCase().indexOf(nombre.toLowerCase()) === 0);
  }

  displayFn(escuela?: Escuela): string | undefined {
    return escuela ? escuela.nombre : undefined;
  }

  confirmAdd() {
    const maestro = this.forma.get('maestro').value;
    const escuela = this.forma.get('escuela').value;
    const lideres: any[] = (this.forma.get('lideres').value as Array<any>).map(
      (x) => {
        return {
          lider: x.lider.idprofesor,
          comision_lider: x.comision_lider
        };
      }
    );
    // lideres = lideres.map(
    //   (x) => {
    //     return {
    //       lider: x.lider.idprofesor,
    //       comision_lider: x.comision_lider
    //     };
    //   }
    // );
    const venta: any = this.forma.value;
    delete venta.maestro;
    delete venta.escuela;
    venta.lideres = lideres;
    venta.idprofesor = maestro.idprofesor;
    venta.escuela_clave = escuela.clave;
    console.log(venta);
    this._ventaService.putVenta(venta)
      .subscribe(res => {
        this.dialogRef.close(true);
        },
        error1 => {
          swal('Algo malo ha ocurrido', 'Error con el servidor', 'error');
          this.dialogRef.close(false);
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  compareFn(x: any, y: any): boolean {
    console.log('x: ', x, 'y: ', y);
    return x && y ? x.idprofesor === y.idprofesor : x === y;
  }


  compareFnLider(x: any, y: any): boolean {
    console.log('x: ', x, 'y: ', y);
    return x && y ? x.idprofesor === y.idprofesor : x === y;
  }

}
