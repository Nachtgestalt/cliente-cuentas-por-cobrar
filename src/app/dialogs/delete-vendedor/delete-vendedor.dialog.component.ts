import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {VendedorService} from "../../services/vendedor/vendedor.service";


@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs/delete-vendedor/delete-vendedor.dialog.html',
  styleUrls: ['../../dialogs/delete-vendedor/delete-vendedor.dialog.css']
})
export class DeleteVendedorDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteVendedorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public _vendedorService: VendedorService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this._vendedorService.deleteVendedor(this.data.clave)
      .subscribe(res => {
        console.log('esta madre se borro!')
      });
  }
}
