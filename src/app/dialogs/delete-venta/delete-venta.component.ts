import {Component, Inject, OnInit} from '@angular/core';
import {DeleteProductoDialogComponent} from '../delete-producto/delete-producto.dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {VentaService} from '../../services/venta/venta.service';

@Component({
  selector: 'app-delete-venta',
  templateUrl: './delete-venta.component.html',
  styleUrls: ['./delete-venta.component.css']
})
export class DeleteVentaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteProductoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public _ventaService: VentaService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    console.log('Entre al delete')
    this._ventaService.deleteVenta(this.data.folio)
      .subscribe(res => {
        console.log(res);
        console.log('esta madre se borro!');
        this.dialogRef.close(true);
      },
        error => {
          swal('Algo ha salido mal', 'La venta que intentas borrar tiene al menos un pedido confirmado.', 'error');
          this.dialogRef.close(false);
        }
      );
  }

}
