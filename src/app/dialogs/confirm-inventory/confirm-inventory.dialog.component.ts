import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {InventarioService} from '../../services/inventario/inventario.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-confirm-inventory',
  templateUrl: './confirm-inventory.dialog.component.html',
  styleUrls: ['./confirm-inventory.dialog.component.css']
})
export class ConfirmInventoryDialogComponent implements OnInit {
  mensajeDialog: string;
  forma: FormGroup;
  cantidadEntregar: string;

  constructor(public dialogRef: MatDialogRef<ConfirmInventoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public _inventarioService: InventarioService,
              public renderer: Renderer2) {
  }

  ngOnInit() {
    this.crearForma(this.data);
    if (this.data.entrega) {
      this.mensajeDialog = 'Confirmar entrega';
      this.cantidadEntregar = 'Cantidad a entregar';
      this.forma.get('cantidad').setValidators(Validators.compose([Validators.min(1), Validators.max(this.data.cantidad)]));
    } else {
      this.mensajeDialog = 'Confirmar devolución';
      this.cantidadEntregar = 'Cantidad a devolver';
      this.forma.get('cantidad').setValue(this.data.cantidad * -1);
    }

    console.log(this.data);
  }

  crearForma(data) {
    this.forma = new FormGroup({
      'folio': new FormControl(data.folio, Validators.required),
      'titulo': new FormControl(data.titulo, Validators.required),
      'cantidad': new FormControl('', [Validators.required]),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmarPedido() {
    const idHistorial = this.data.idHistorial;
    let cantidad = this.forma.get('cantidad').value;
    if (!this.data.entrega) {
      cantidad = cantidad * -1;
    }
    this._inventarioService.confirmarPedido(idHistorial, cantidad)
      .subscribe(
        res => {
          console.log(res);
          this.dialogRef.close(true);
        },
        () => {
          swal('Algo malo ha ocurrido', 'Error con el servidor', 'error');
        }
      );
  }
}
