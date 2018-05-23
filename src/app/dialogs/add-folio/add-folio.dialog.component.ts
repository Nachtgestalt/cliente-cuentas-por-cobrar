import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AddTemporadaComponent} from '../add-temporada/add-temporada.dialog.component';
import {TemporadaService} from '../../services/temporada/temporada.service';
import {Moment} from 'moment';
import {Temporada} from '../../interfaces/temporada.interface';
import {FolioService} from '../../services/folio/folio.service';
import {Folio} from '../../interfaces/folio.interface';

@Component({
  selector: 'app-add-folio',
  templateUrl: './add-folio.dialog.component.html',
  styleUrls: ['./add-folio.dialog.component.css']
})
export class AddFolioDialogComponent implements OnInit {
  forma: FormGroup;
  mensajeDialog: string;
  temporadas: Temporada[];

  tipoFolios = [
    {value: 'COBRANZA', viewValue: 'COBRANZA'},
    {value: 'VENTA', viewValue: 'VENTA'},
    {value: 'RECIBOS DE DINERO', viewValue: 'RECIBOS DE DINERO'},
  ];

  folio: Folio = {
    idfolios: null,
    tipo: '',
    inicio: null,
    fin: null,
    idtemporada: null
  };

  constructor(public dialogRef: MatDialogRef<AddTemporadaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public _temporadaService: TemporadaService,
              private _folioService: FolioService) {
    this._temporadaService.getTemporadas()
      .subscribe( (res: Temporada[]) => {
        this.temporadas = res;
        console.log(res);
      });
  }

  ngOnInit() {
    if ( this.data.edit ) {
      console.log(this.data);
      this.mensajeDialog = 'Editar Folio';
      this.forma = new FormGroup({
        'tipo': new FormControl(this.data.tipo, Validators.required),
        'inicio': new FormControl(this.data.inicio, Validators.required),
        'fin': new FormControl(this.data.fin, Validators.required),
        'idtemporada': new FormControl('', Validators.required)
      });
    } else {
      this.mensajeDialog = 'Agregar Folio';
      this.forma = new FormGroup({
        'tipo': new FormControl('', Validators.required),
        'inicio': new FormControl('', Validators.required),
        'fin': new FormControl('', Validators.required),
        'idtemporada': new FormControl('', Validators.required)
      });
    }
  }

  getErrorMessages() {
    return ' Campo requerido ';
  }

  confirmAdd() {
    if ( this.data.edit ) {
      console.log(this.forma.value);
      this.folio = this.forma.value;
      this.folio.idfolios = this.data.idfolios;
      // console.log(this.folio);
      this._folioService.actualizarFolio(this.folio)
        .subscribe( res => {
          console.log(res);
        });
    } else {
      console.log(this.forma.value);
      this.folio = this.forma.value;
      this.folio.idfolios = null;
      console.log(this.folio);
      this._folioService.agregarFolio(this.folio)
        .subscribe( res => {
          console.log(res);
        });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
