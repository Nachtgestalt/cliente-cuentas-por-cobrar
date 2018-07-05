import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmInventoryDialogComponent} from '../confirm-inventory/confirm-inventory.dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {InventarioService} from '../../services/inventario/inventario.service';
import {CuentasXcobrarService} from '../../services/cuentas-xcobrar/cuentas-xcobrar.service';

@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.css']
})
export class ConfirmPaymentComponent implements OnInit {
  forma: FormGroup;

  constructor(public dialogRef: MatDialogRef<ConfirmInventoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public _cuentasService: CuentasXcobrarService) { }

  ngOnInit() {
    console.log(this.data)
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
    this._cuentasService.abonar(this.data.idProfesor, season.idtemporada, this.forma.get('cantidad').value, this.data.parametros)
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
