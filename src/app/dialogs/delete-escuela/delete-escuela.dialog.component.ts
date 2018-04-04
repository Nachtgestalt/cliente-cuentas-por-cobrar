import {Component, Inject, OnInit} from '@angular/core';
import {ProductosService} from "../../services/producto/productos.service";
import {DeleteProductoDialogComponent} from "../delete-producto/delete-producto.dialog.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {EscuelaService} from "../../services/escuela/escuela.service";

@Component({
  selector: 'app-delete-escuela',
  templateUrl: './delete-escuela.dialog.component.html',
  styleUrls: ['./delete-escuela.dialog.component.css']
})
export class DeleteEscuelaDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteProductoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public _escuelaService: EscuelaService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    console.log('Entre al delete')
    this._escuelaService.borrarEscuela(this.data.clave)
      .subscribe(res => {
        console.log('esta madre se borro!');
      });
  }

}
