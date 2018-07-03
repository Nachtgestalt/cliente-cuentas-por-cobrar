import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BloqueFoliosService} from '../../../services/bloque-folios/bloque-folios.service';
import {InventarioService} from '../../../services/inventario/inventario.service';
import {InventarioDataSource} from '../../inventario/inventario.component';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {Inventario} from '../../../interfaces/inventario.interface';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-bloque-folios',
  templateUrl: './bloque-folios.component.html',
  styleUrls: ['./bloque-folios.component.css']
})
export class BloqueFoliosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  displayedColumns = ['clave', 'vendedor', 'tipo', 'inicio', 'fin', 'temporada'];
  exampleDatabase: BloqueFoliosService | null;
  dataSource: BloqueFolioDataSource | null;

  constructor( private httpClient: HttpClient,
               public dialog: MatDialog,
               public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new BloqueFoliosService(this.httpClient);
    this.dataSource = new BloqueFolioDataSource(this.exampleDatabase, this.paginator, this.sort);
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

}


export class BloqueFolioDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: any[] = [];
  renderedData: any[] = [];

  constructor(public _exampleDatabase: BloqueFoliosService,
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
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.obtenerBloqueFolios();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((bloqueFolio: any) => {
        const searchStr = (bloqueFolio.folio.tipo + bloqueFolio.vendedor.nombre +
          bloqueFolio.vendedor.clave + bloqueFolio.vendedor.apellidos).toLowerCase();
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
        case 'clave': [propertyA, propertyB] = [a.vendedor.clave, b.vendedor.clave]; break;
        case 'tipo': [propertyA, propertyB] = [a.folio, b.folio]; break;
        case 'inicio': [propertyA, propertyB] = [a.inicio, b.inicio]; break;
        case 'fin': [propertyA, propertyB] = [a.fin, b.fin]; break;
        case 'vendedor': [propertyA, propertyB] = [(a.vendedor.nombre + a.vendedor.apellidos), (b.vendedor.nombre + b.vendedor.apellidos)]; break;
        case 'temporada': [propertyA, propertyB] = [a.folio.idtemporada.nombre, a.folio.idtemporada.nombre]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
