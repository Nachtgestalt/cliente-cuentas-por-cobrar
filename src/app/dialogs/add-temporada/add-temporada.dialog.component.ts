import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TemporadaService} from '../../services/temporada/temporada.service';
import {Temporada} from '../../interfaces/temporada.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {Moment} from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMM YYYY',
  },
};


@Component({
  selector: 'app-add-temporada',
  templateUrl: './add-temporada.dialog.component.html',
  styleUrls: ['./add-temporada.dialog.component.css'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ],
})
export class AddTemporadaComponent implements OnInit {
  forma: FormGroup;
  mensajeDialog: string;
  private temporada: Temporada = {
    idtemporada: null,
    nombre: '',
    fecha_inicio: '',
    fecha_termino: ''
  };

  constructor(public dialogRef: MatDialogRef<AddTemporadaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public _temporadaService: TemporadaService) { }

  ngOnInit() {
    console.log(this.data);
    if ( this.data.edit ) {
      this.mensajeDialog = 'Editar temporada';
      this.forma = new FormGroup({
        'idtemporada': new FormControl(this.data.id, Validators.required),
        'nombre': new FormControl(this.data.nombre, Validators.required),
        'fecha_inicio': new FormControl(this.data.fecha_inicio, Validators.required),
        'fecha_termino': new FormControl(this.data.fecha_termino, Validators.required),
      });
    } else {
      this.mensajeDialog = 'Agregar temporada';
      this.forma = new FormGroup({
        'nombre': new FormControl('', Validators.required),
        'fecha_inicio': new FormControl('', Validators.required),
        'fecha_termino': new FormControl('', Validators.required),
      });
    }
  }

  getErrorMessages() {
    return ' Campo requerido ';
  }

  confirmAdd() {
    let fecha_inicio;
    let fecha_termino;

    if ( this.data.edit ) {
      console.log(this.forma.value);
      this._temporadaService.actualizarTemporada(this.forma.value)
        .subscribe( res => {
          console.log(res);
        });
    } else {
      const fechaInicio: Moment = this.forma.get('fecha_inicio').value;
      const fechaTermino: Moment = this.forma.get('fecha_termino').value;
      console.log(fechaInicio);
      console.log(this.forma.value);

      fecha_inicio = fechaInicio.format('YYYY[-]MM[-]DD');
      fecha_termino = fechaTermino.format('YYYY[-]MM[-]DD');

      this.temporada.nombre = this.forma.get('nombre').value;
      this.temporada.fecha_inicio = fecha_inicio;
      this.temporada.fecha_termino = fecha_termino;

      console.log(this.temporada);

      this._temporadaService.agregarTemporada(this.temporada)
        .subscribe(res => {
          console.log(res);
        });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
