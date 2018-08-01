import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator, MatSort} from '@angular/material';
import {CuentasXcobrarService} from '../../../services/cuentas-xcobrar/cuentas-xcobrar.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-cuentas-escuela',
  templateUrl: './cuentas-escuela.component.html',
  styleUrls: ['./cuentas-escuela.component.css']
})
export class CuentasEscuelaComponent implements OnInit {
  idVendedor: any;
  season = JSON.parse(localStorage.getItem('season'));

  displayedColumns = ['clave', 'nombre', 'deuda', 'pagado', 'restante'];
  exampleDatabase: CuentasXcobrarService | null;
  dataSource: CuentasEscuelaDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient) {
    this.route.params
      .subscribe(parametros => {
        console.log(parametros);
        this.idVendedor = parametros.claveVendedor;
        console.log(this.idVendedor);
      });
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new CuentasXcobrarService(this.httpClient);
    this.dataSource = new CuentasEscuelaDataSource(this.exampleDatabase, this.paginator, this.sort, this.idVendedor);
    console.log(this.dataSource);
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

export class CuentasEscuelaDataSource extends DataSource<any> {
  season = JSON.parse(localStorage.getItem('season'));
  _filterChange = new BehaviorSubject('');

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

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
              public _claveVendedor: string) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChangeEscuela,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    console.log(this._exampleDatabase.getCuentasXVendedorEscuela(this.season.idtemporada, this._claveVendedor));
    // this._exampleDatabase.getCuentasXVendedorEscuela(this.season.idtemporada, this._claveVendedor);


    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.dataEscuela.slice().filter((cuentaVendedor: any) => {
        const searchStr = (cuentaVendedor.clave + cuentaVendedor.nombre).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    }
    );
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
