import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {CuentasXcobrarService} from '../../../services/cuentas-xcobrar/cuentas-xcobrar.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ConfirmInventoryDialogComponent} from '../../../dialogs/confirm-inventory/confirm-inventory.dialog.component';
import {ConfirmPaymentComponent} from '../../../dialogs/confirm-payment/confirm-payment.component';

@Component({
  selector: 'app-cuentas-maestro',
  templateUrl: './cuentas-maestro.component.html',
  styleUrls: ['./cuentas-maestro.component.css']
})
export class CuentasMaestroComponent implements OnInit {
  parametros: any;
  season = JSON.parse(localStorage.getItem('season'));

  displayedColumns = ['clave', 'nombre', 'deuda', 'pagado', 'restante', 'options'];
  exampleDatabase: CuentasXcobrarService | null;
  dataSource: CuentasMaestroDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) {
    this.route.params
      .subscribe(parametros => {
        console.log(parametros);
        this.parametros = parametros
        console.log(parametros);
      });
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new CuentasXcobrarService(this.httpClient);
    this.dataSource = new CuentasMaestroDataSource(this.exampleDatabase, this.paginator, this.sort, this.parametros);
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
        parametros: this.parametros,
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

export class CuentasMaestroDataSource extends DataSource<any> {
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

  constructor(public _exampleDatabase: CuentasXcobrarService,
              public _paginator: MatPaginator,
              public _sort: MatSort,
              public parametros) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChangeMaestro,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getCuentasXVendedorEscuelaMaestro(this.season.idtemporada, this.parametros.claveVendedor, this.parametros.claveEscuela);

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.dataMaestro.slice().filter((cuentaMaestro: any) => {
        const searchStr = (cuentaMaestro.idprofesor + cuentaMaestro.nombre).toLowerCase();
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
        case 'clave': [propertyA, propertyB] = [a.idprofesor, b.idprofesor]; break;
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

