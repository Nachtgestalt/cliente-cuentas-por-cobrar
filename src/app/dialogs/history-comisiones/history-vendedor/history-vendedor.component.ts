import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ComisionesService} from '../../../services/comisiones/comisiones.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ConfirmPaymentComponent} from '../../confirm-payment/confirm-payment.component';
import {HttpClient} from '@angular/common/http';
import {DataSource} from '@angular/cdk/collections';
import {MAT_DIALOG_DATA, MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';

@Component({
  selector: 'app-history-vendedor',
  templateUrl: './history-vendedor.component.html',
  styleUrls: ['./history-vendedor.component.css']
})
export class HistoryVendedorComponent implements OnInit {
  season = JSON.parse(localStorage.getItem('season'));

  displayedColumns = ['fecha', 'cantidad'];
  exampleDatabase: ComisionesService | null;
  dataSource: ComisionVendedorDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private httpClient: HttpClient,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new ComisionesService(this.httpClient);
    this.dataSource = new ComisionVendedorDataSource(this.exampleDatabase, this.paginator, this.sort, this.data.id);
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

  confirm(i: number, idLider: number, nombre: string, restante: number) {

    const dialogRef = this.dialog.open(ConfirmPaymentComponent, {
      data: {
        source: {
          id: idLider,
          component: 'ComisionesLider'
        },
        nombre: nombre,
        restante: restante
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.openSnackBar('Abono realizado con exito', 'Aceptar');
        this.loadData();
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getDeudaTotal() {
    return this.dataSource.renderedData.map(t => t.deuda).reduce((acc, value) => acc + value, 0);
  }

  getRestanteTotal() {
    return this.dataSource.renderedData.map(t => t.restante).reduce((acc, value) => acc + value, 0);
  }

  getPagadoTotal() {
    return this.dataSource.renderedData.map(t => t.pagado).reduce((acc, value) => acc + value, 0);
  }

}

export class ComisionVendedorDataSource extends DataSource<any> {
  season = JSON.parse(localStorage.getItem('season'));
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: any[] = [];
  renderedData: any[] = [];

  constructor(public _exampleDatabase: ComisionesService,
              public _paginator: MatPaginator,
              public _sort: MatSort,
              public id) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChangeComisionVendedor,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getComisionXVendedor(this.season.idtemporada, this.id);

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.dataComisionVendedor.slice().filter((cuentaVendedor: any) => {
        const searchStr = (cuentaVendedor.fecha).toLowerCase();
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
  sortData(data: any[]): any[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'fecha': [propertyA, propertyB] = [a.fecha, b.fecha]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }


}
