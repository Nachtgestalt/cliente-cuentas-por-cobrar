import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Vendedor} from '../../interfaces/vendedor.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AddTemporadaComponent} from '../add-temporada/add-temporada.dialog.component';

@Component({
  selector: 'app-confirm-inventory',
  templateUrl: './confirm-inventory.dialog.component.html',
  styleUrls: ['./confirm-inventory.dialog.component.css']
})
export class ConfirmInventoryDialogComponent implements OnInit {
  mensajeDialog: string;
  vendedorSelect: Vendedor[];
  forma: FormGroup;

  constructor(public dialogRef: MatDialogRef<ConfirmInventoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.crearForma(this.data);
    if (this.data.entrega) {
      this.mensajeDialog = 'Confirmar entrega';
    } else {
      this.mensajeDialog = 'Confirmar devolución';
      this.forma.get('cantidad').setValue(this.data.cantidad * -1);
    }

    console.log(this.data);
    console.log(this.forma.value);

  }

  crearForma(data) {
    this.forma = new FormGroup({
      'folio': new FormControl(data.folio, Validators.required),
      'titulo': new FormControl(data.titulo, Validators.required),
      'cantidad': new FormControl('', Validators.required),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
