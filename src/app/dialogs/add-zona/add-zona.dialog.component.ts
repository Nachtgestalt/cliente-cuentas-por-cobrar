import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Temporada} from '../../interfaces/temporada.interface';
import {TemporadaService} from '../../services/temporada/temporada.service';
import {AddTemporadaComponent} from '../add-temporada/add-temporada.dialog.component';
import {ZonaService} from '../../services/zona/zona.service';
import {VendedorService} from '../../services/vendedor/vendedor.service';
import {Vendedor} from '../../interfaces/vendedor.interface';

@Component({
  selector: 'app-add-zona',
  templateUrl: './add-zona.dialog.component.html',
  styleUrls: ['./add-zona.dialogcomponent.css']
})
export class AddZonaDialogComponent implements OnInit {
  mensajeDialog: string;
  vendedorSelect: Vendedor[];
  forma: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddTemporadaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _zonaService: ZonaService,
              private _vendedorService: VendedorService) { }

  ngOnInit() {
    console.log(this.data);
    if ( this.data.edit ) {
      this.mensajeDialog = 'Editar zona'
      this.forma = new FormGroup({
        'idzona': new FormControl(this.data.id, Validators.required),
        'vendedor': new FormControl('', Validators.required),
        // 'vendedor': new FormGroup({
        //   'clave': new FormControl('', Validators.required)}
        // )
      });
    } else {
      this.mensajeDialog = 'Agregar zona'
      this.forma = new FormGroup({
        'idzona': new FormControl('', Validators.required),
        'vendedor': new FormGroup({
          'clave': new FormControl('', Validators.required)}
        )
      });
    }
    this.loadData();
  }

  loadData() {
    this._vendedorService.getVendedores()
      .subscribe((res: Vendedor[]) => {
        console.log(res);
        this.vendedorSelect = res;
      });
  }

  getErrorMessages() {
    return ' Campo requerido ';
  }

  confirmAdd() {
    console.log(this.forma.value);
    if( this.data.edit ) {
      this._zonaService.actualizarZona(this.forma.value)
        .subscribe( res => {
          console.log(res);
        });
    } else {
      console.log(this.forma.value);
      this._zonaService.agregarZona(this.forma.value)
        .subscribe( res => {
          console.log(res);
        });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
