import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {VendedorService} from '../../services/vendedor/vendedor.service';
import {DeleteVendedorDialogComponent} from '../delete-vendedor/delete-vendedor.dialog.component';
import {MaestroService} from '../../services/maestro/maestro.service';
import swal from 'sweetalert';
import {ModificarMaestroComponent} from "../../pages/maestros/modificar-maestro/modificar-maestro.component";

@Component({
  selector: 'app-delete-profesor',
  templateUrl: './delete-profesor.dialogcomponent.html',
  styleUrls: ['./delete-profesor.dialog.component.css']
})
export class DeleteProfesorDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteVendedorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public _maestroService: MaestroService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    console.log(this.data);
    this._maestroService.deleteProfesor(this.data.clave)
      .subscribe(res => {
        console.log('esta madre se borro!');
      });
  }
}
