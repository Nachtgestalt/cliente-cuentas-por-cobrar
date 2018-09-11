import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Inventario} from '../../interfaces/inventario.interface';
import {InventarioService} from '../../services/inventario/inventario.service';
import {HttpClient} from '@angular/common/http';
import {ConfirmInventoryDialogComponent} from '../../dialogs/confirm-inventory/confirm-inventory.dialog.component';
import {InventoryDialogComponent} from '../../dialogs/inventory/inventory.dialog.component';
import {HistoryStockComponent} from '../../dialogs/history-stock/history-stock.component';
import {ReportesService} from '../../services/reportes/reportes.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  displayedColumns = ['folio', 'titulo', 'cantidad', 'edit'];
  exampleDatabase: InventarioService | null;
  dataSource: InventarioDataSource | null;

  entrega: boolean;

  index: number;
  id: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private httpClient: HttpClient,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public _reportesService: ReportesService,
              private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new InventarioService(this.httpClient);
    this.dataSource = new InventarioDataSource(this.exampleDatabase, this.paginator, this.sort);
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

  inventario(i: number, claveProducto: number, tipoEntrada: boolean) {
    const dialogRef = this.dialog.open(InventoryDialogComponent, {
      data: {
        claveProducto: claveProducto,
        tipoEntrada: tipoEntrada
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.loadData();
        // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idHistorial === this.id);
        // // for delete we use splice in order to remove single object from DataService
        // this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        // this.refreshTable();
      }
    });
  }

  historial(id: number) {
    const dialogRef = this.dialog.open(HistoryStockComponent, {
      data: {
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
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

  reporteInventario() {
    let pdfResult;
    this._reportesService.reporteInventario().subscribe(
      (data: any) => {
        console.log(data);
        pdfResult = this.domSanitizer.bypassSecurityTrustResourceUrl(
          URL.createObjectURL(data)
        );
        window.open(pdfResult.changingThisBreaksApplicationSecurity);
        console.log(pdfResult);
      }
    );

  }
}

export class InventarioDataSource extends DataSource<Inventario> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Inventario[] = [];
  renderedData: Inventario[] = [];

  constructor(public _exampleDatabase: InventarioService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Inventario[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.obtenerStocks();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((inventario: Inventario) => {
        const searchStr = (inventario.folio + inventario.titulo).toLowerCase();
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
  sortData(data: Inventario[]): Inventario[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'folio': [propertyA, propertyB] = [a.folio, b.folio]; break;
        case 'titulo': [propertyA, propertyB] = [a.titulo, b.titulo]; break;
        case 'cantidad': [propertyA, propertyB] = [a.cantidad, b.cantidad]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
