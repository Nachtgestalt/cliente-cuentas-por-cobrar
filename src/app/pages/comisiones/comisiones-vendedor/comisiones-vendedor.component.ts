import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/collections';
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {ComisionesService} from '../../../services/comisiones/comisiones.service';
import {ConfirmPaymentComponent} from '../../../dialogs/confirm-payment/confirm-payment.component';

@Component({
  selector: 'app-comisiones-vendedor',
  templateUrl: './comisiones-vendedor.component.html',
  styleUrls: ['./comisiones-vendedor.component.css']
})
export class ComisionesVendedorComponent implements OnInit {

  season = JSON.parse(localStorage.getItem('season'));

  displayedColumns = ['nombre', 'deuda', 'pagado', 'restante'];
  exampleDatabase: ComisionesService | null;
  dataSource: ComisionesVendedorDataSource | null;

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
    this.dataSource = new ComisionesVendedorDataSource(this.exampleDatabase, this.paginator, this.sort);
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

  confirm(i: number, idProfesor: number, nombre: string, restante: number) {

    const dialogRef = this.dialog.open(ConfirmPaymentComponent, {
      data: {
        idProfesor: idProfesor,
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

}

export class ComisionesVendedorDataSource extends DataSource<any> {
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
      this._exampleDatabase.dataChangeVendedor,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getComisionesXVendedor(this.season.idtemporada);

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.dataVendedor.slice().filter((cuentaVendedor: any) => {
        const searchStr = (cuentaVendedor.clave + cuentaVendedor.nombre).toLowerCase();
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
