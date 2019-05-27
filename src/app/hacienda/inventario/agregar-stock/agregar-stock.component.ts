import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {StockService} from '../../../services/stock/stock.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AddTemporadaComponent} from '../../../dialogs/add-temporada/add-temporada.dialog.component';
import {Stock} from '../../../interfaces/stock.interface';
import {StockHService} from '../../services/stock-h.service';

@Component({
  selector: 'app-agregar-stock',
  templateUrl: './agregar-stock.component.html',
  styleUrls: ['./agregar-stock.component.css']
})
export class AgregarStockComponent implements OnInit {
  forma: FormGroup;

  mensajeDialog = '';
  motivo = '';
  tipoMovimiento = '';
  user = JSON.parse(localStorage.getItem('user'));

  constructor(private _stockHService: StockHService,
              public dialogRef: MatDialogRef<AddTemporadaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.createForm();
    if (this.data.tipoEntrada) {
      this.mensajeDialog = 'ENTRADA DE PRODUCTO';
      this.tipoMovimiento = 'ENTRADA';
    } else {
      this.mensajeDialog = 'SALIDA DE PRODUCTO';
      this.tipoMovimiento = 'SALIDA';
    }
    console.log(this.data);
  }

  createForm() {
    this.forma = new FormGroup({
        'motivo': new FormControl(),
        'cantidad': new FormControl()
      }
    );
  }

  confirmMovement() {

    let cantidad = 0;

    if (this.data.tipoEntrada) {
      cantidad = this.forma.get('cantidad').value;
    } else {
      cantidad = -1 * this.forma.get('cantidad').value;
    }

    const stock: Stock = {
      idstock: null,
      cantidad: cantidad,
      libro: this.data.claveProducto,
      fecha_entrada: null,
      stock_actual: null,
      motivo: this.forma.get('motivo').value,
      tipomovimiento: this.tipoMovimiento
    };

    this._stockHService.createStock(stock)
      .subscribe(
        res => {
          console.log(res);
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
