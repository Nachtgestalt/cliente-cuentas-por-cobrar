import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {ConfirmInventoryDialogComponent} from '../../../dialogs/confirm-inventory/confirm-inventory.dialog.component';
import {HttpClient} from '@angular/common/http';
import {VentaService} from '../../../services/venta/venta.service';
import {EditPedidoDialogComponent} from '../../../dialogs/edit-pedido/edit-pedido.dialog.component';
import {VentaResurtidoComponent} from '../../../dialogs/venta-resurtido/venta-resurtido.component';
import {DeleteVentaComponent} from '../../../dialogs/delete-venta/delete-venta.component';
import {DomSanitizer} from '@angular/platform-browser';
import {ShowResurtidosDialogComponent} from '../../../dialogs/show-resurtidos/show-resurtidos.dialog.component';
import {VentaDataSource} from '../../../datasources/venta.datasource';

import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-modificar-venta',
  templateUrl: './modificar-venta.component.html',
  styleUrls: ['./modificar-venta.component.css']
})

export class ModificarVentaComponent implements OnInit {
  isLoadingResults = true;

  private isAlive = true;

  displayedColumns = ['folio', 'fecha', 'escuela', 'profesor', 'pagado', 'restante', 'edit'];
  exampleDatabase: VentaService | null;
  dataSource: VentaDataSource | null;

  entrega: boolean;

  index: number;
  id: number;

  user = JSON.parse(localStorage.getItem('user'));

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private httpClient: HttpClient,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public _ventaService: VentaService,
              private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.user.role === 'ADMIN_ROLE' ? this.displayedColumns = ['folio', 'fecha', 'escuela', 'profesor', 'pagado', 'restante', 'edit']
      : this.displayedColumns = ['folio', 'fecha', 'escuela', 'profesor', 'edit'];
    this.loadData();
  }


  public loadData() {
    this.exampleDatabase = new VentaService(this.httpClient);
    this.dataSource = new VentaDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  deleteItem(i: number, folio: string, fecha: string, escuela: string) {
    this.index = i;
    const dialogRef = this.dialog.open(DeleteVentaComponent, {
      data: {
        folio: folio,
        fecha: fecha,
        escuela: escuela,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.openSnackBar('Venta borrada', 'Aceptar');
        this.loadData();
        // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idHistorial === this.id);
        // // for delete we use splice in order to remove single object from DataService
        // this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        // this.refreshTable();
      }
    });
  }

  edit(i: number, idHistorial: number, folio: string, titulo: string, cantidad: number) {
    this.index = i;
    this.id = idHistorial;
    if (cantidad < 0) {
      this.entrega = false;
    } else {
      this.entrega = true;
    }
    const dialogRef = this.dialog.open(EditPedidoDialogComponent, {
      data: {
        idHistorial: idHistorial,
        folio: folio,
        titulo: titulo,
        cantidad: cantidad,
        entrega: this.entrega
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.openSnackBar('Venta actualizada', 'Aceptar');
        this.loadData();
        // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idHistorial === this.id);
        // // for delete we use splice in order to remove single object from DataService
        // this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        // this.refreshTable();
      }
    });
  }

  history(folio: string) {
    const dialogRef = this.dialog.open(ShowResurtidosDialogComponent, {
      data: {
        folio: folio,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.openSnackBar('Pedido confirmado', 'Aceptar');
      }
    });


  }

  confirm(i: number, idHistorial: number, folio: string, titulo: string, cantidad: number) {
    this.index = i;
    this.id = idHistorial;
    if (cantidad < 0) {
      this.entrega = false;
    } else {
      this.entrega = true;
    }
    const dialogRef = this.dialog.open(ConfirmInventoryDialogComponent, {
      data: {
        idHistorial: idHistorial,
        folio: folio,
        titulo: titulo,
        cantidad: cantidad,
        entrega: this.entrega
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.openSnackBar('Pedido confirmado', 'Aceptar');
        this.loadData();
        // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idHistorial === this.id);
        // // for delete we use splice in order to remove single object from DataService
        // this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        // this.refreshTable();
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  print(folio) {
    let pdfResult;
    this._ventaService.getPFDVenta(folio)
      .takeWhile(() => this.isAlive)
      .subscribe(
        (data: any) => {
          console.log(data);
          // var fileURL = URL.createObjectURL(data);
          // window.open(fileURL, 'reporte de venta');
          pdfResult = this.domSanitizer.bypassSecurityTrustResourceUrl(
            URL.createObjectURL(data)
          );
          window.open(pdfResult.changingThisBreaksApplicationSecurity);
          console.log(pdfResult);
        }
      );
  }

  resurtido(i: number, idHistorial: number, folio: string, titulo: string, cantidad: number, resurtido: boolean) {
    const dialogRef = this.dialog.open(VentaResurtidoComponent, {
      data: {
        idHistorial: idHistorial,
        folio: folio,
        titulo: titulo,
        cantidad: cantidad,
        resurtido: resurtido
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.openSnackBar('Venta actualizada', 'Aceptar');
        this.loadData();
        // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idHistorial === this.id);
        // // for delete we use splice in order to remove single object from DataService
        // this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        // this.refreshTable();
      }
    });
  }
}
