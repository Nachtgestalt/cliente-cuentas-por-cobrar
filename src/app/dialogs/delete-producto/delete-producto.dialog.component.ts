import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProductosService} from '../../services/producto/productos.service';

@Component({
  selector: 'app-delete-producto',
  templateUrl: './delete-producto.dialog.component.html',
  styleUrls: ['./delete-producto.dialog.component.css']
})

export class DeleteProductoDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteProductoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public _productoService: ProductosService) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    console.log('Entre al delete');
    this._productoService.borrarProducto(this.data.clave)
      .subscribe(() => {
        console.log('esta madre se borro!');
      });
  }

}
