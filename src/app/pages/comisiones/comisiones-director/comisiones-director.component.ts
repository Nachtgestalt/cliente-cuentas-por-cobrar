import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {ConfirmPaymentComponent} from '../../../dialogs/confirm-payment/confirm-payment.component';
import {HttpClient} from '@angular/common/http';
import {ComisionesService} from '../../../services/comisiones/comisiones.service';

@Component({
  selector: 'app-comisiones-director',
  templateUrl: './comisiones-director.component.html',
  styleUrls: ['./comisiones-director.component.css']
})
export class ComisionesDirectorComponent implements OnInit {

  season = JSON.parse(localStorage.getItem('season'));

  displayedColumns = ['id', 'nombre', 'deuda', 'pagado', 'restante', 'options'];
  exampleDatabase: ComisionesService | null;
  dataSource: ComisionesDirectorDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private httpClient: HttpClient,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new ComisionesService(this.httpClient);
    this.dataSource = new ComisionesDirectorDataSource(this.exampleDatabase, this.paginator, this.sort);
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

  confirm(i: number, idDirector: number, nombre: string, restante: number) {

    const dialogRef = this.dialog.open(ConfirmPaymentComponent, {
      data: {
        source: {
          id: idDirector,
          component: 'ComisionesDirector'
        },
        nombre: nombre,
        restante: restante
      }
    });

    dialogRef.afterClosed().subscribe(result => {
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

export class ComisionesDirectorDataSource extends DataSource<any> {
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
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChangeDirector,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getComisionesXDirector(this.season.idtemporada);

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.dataDirector.slice().filter((cuentaDirector: any) => {
        const searchStr = (cuentaDirector.clave + cuentaDirector.nombre).toLowerCase();
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
        case 'clave': [propertyA, propertyB] = [a.clave, b.clave]; break;
        case 'nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
        case 'deuda': [propertyA, propertyB] = [a.deuda, b.deuda]; break;
        case 'pagado': [propertyA, propertyB] = [a.pagado, b.pagado]; break;
        case 'restante': [propertyA, propertyB] = [a.restante, b.restante]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
