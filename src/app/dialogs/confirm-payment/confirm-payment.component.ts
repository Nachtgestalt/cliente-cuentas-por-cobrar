import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmInventoryDialogComponent} from '../confirm-inventory/confirm-inventory.dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {InventarioService} from '../../services/inventario/inventario.service';
import {CuentasXcobrarService} from '../../services/cuentas-xcobrar/cuentas-xcobrar.service';
import {ComisionesService} from '../../services/comisiones/comisiones.service';

@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.css']
})
export class ConfirmPaymentComponent implements OnInit {
  forma: FormGroup;

  constructor(public dialogRef: MatDialogRef<ConfirmInventoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _cuentasService: CuentasXcobrarService,
              private _comisionesService: ComisionesService) { }

  ngOnInit() {
    console.log(this.data);
    this.createForm();
  }

  createForm() {
    this.forma = new FormGroup({
      'nombre': new FormControl(this.data.nombre),
      'cantidad': new FormControl('', [Validators.required, Validators.min(.01), Validators.max(this.data.restante)])
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmMovement() {
    const season = JSON.parse(localStorage.getItem('season'));
    const monto = this.forma.get('cantidad').value;
    if (this.data.source.component === 'cuentas') {
      this.abonarCuentaMaestro(this.data.source.id, season.idtemporada, this.forma.get('cantidad').value, this.data.parametros);
    } else if (this.data.source.component === 'ComisionesVendedor') {
      this.abonarComisionVendedor(season.idtemporada, monto, this.data.source.id);
    } else if (this.data.source.component === 'ComisionesDirector') {
      this.abonarComisionDirector(season.idtemporada, monto, this.data.source.id);
    } else if (this.data.source.component === 'ComisionesLider') {
      this.abonarComisionLider(season.idtemporada, monto, this.data.source.id);
    }
  }

  abonarCuentaMaestro(idProfesor, season, cantidad, parametros) {
    this._cuentasService.abonar(idProfesor, season, cantidad, parametros)
      .subscribe(
        res => {
          console.log(res);
          this.dialogRef.close(true);
        },
        error1 => {
          swal('Algo malo ha ocurrido', 'Error con el servidor', 'error');
          this.dialogRef.close(false);
        }
      );
  }

  abonarComisionVendedor(season, monto, id) {
    this._comisionesService.postAbonarComisionVendedor(season, monto, id)
      .subscribe(
        res => {
          console.log(res);
          this.dialogRef.close(true);
        },
        error1 => {
          swal('Algo malo ha ocurrido', 'Error con el servidor', 'error');
          this.dialogRef.close(false);
        }
      );
  }

  abonarComisionDirector(season, monto, id) {
    this._comisionesService.postAbonarComisionDirector(season, monto, id)
      .subscribe(
        res => {
          console.log(res);
          this.dialogRef.close(true);
        },
        error1 => {
          swal('Algo malo ha ocurrido', 'Error con el servidor', 'error');
          this.dialogRef.close(false);
        }
      );
  }

  abonarComisionLider(season, monto, id) {
    this._comisionesService.postAbonarComisionLider(season, monto, id)
      .subscribe(
        res => {
          console.log(res);
          this.dialogRef.close(true);
        },
        error1 => {
          swal('Algo malo ha ocurrido', 'Error con el servidor', 'error');
          this.dialogRef.close(false);
        }
      );
  }


}
