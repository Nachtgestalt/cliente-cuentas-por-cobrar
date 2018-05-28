import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {Inventario} from '../../../interfaces/inventario.interface';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {InventarioService} from '../../../services/inventario/inventario.service';
import {ConfirmInventoryDialogComponent} from '../../../dialogs/confirm-inventory/confirm-inventory.dialog.component';
import {HttpClient} from '@angular/common/http';
import {Venta} from '../../../interfaces/venta.interface';
import {VentaService} from '../../../services/venta/venta.service';
import {EditPedidoDialogComponent} from '../../../dialogs/edit-pedido/edit-pedido.dialog.component';
import {VentaResurtidoComponent} from '../../../dialogs/venta-resurtido/venta-resurtido.component';
import {DeleteVentaComponent} from '../../../dialogs/delete-venta/delete-venta.component';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-modificar-venta',
  templateUrl: './modificar-venta.component.html',
  styleUrls: ['./modificar-venta.component.css']
})

export class ModificarVentaComponent implements OnInit {

  isAlive = true;

  displayedColumns = ['folio', 'fecha', 'escuela', 'profesor', 'edit'];
  exampleDatabase: VentaService | null;
  dataSource: VentaDataSource | null;

  entrega: boolean;

  index: number;
  id: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private httpClient: HttpClient,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public _ventaService: VentaService,
              private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadData();
  }

  private refreshTable() {
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }
  }

  public loadData() {
    this.exampleDatabase = new VentaService(this.httpClient);
    this.dataSource = new VentaDataSource(this.exampleDatabase, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
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
        this.openSnackBar('Venta actualizada', 'Aceptar');
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

  confirm(i: number, idHistorial: number, folio: string, titulo: string, cantidad: number) {
    this.index = i;
    this.id = idHistorial;
    if (cantidad < 0 ) {
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

export class VentaDataSource extends DataSource<Venta> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Venta[] = [];
  renderedData: Venta[] = [];

  constructor(public _exampleDatabase: VentaService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Venta[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getVentas();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((venta: Venta) => {
        const searchStr = (venta.folio + venta.fecha + venta.escuela.nombre + venta.profesor.nombre).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }
  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: Venta[]): Venta[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'folio': [propertyA, propertyB] = [a.folio, b.folio]; break;
        case 'titulo': [propertyA, propertyB] = [a.fecha, b.fecha]; break;
        case 'escuela': [propertyA, propertyB] = [a.escuela.nombre, b.escuela.nombre]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
