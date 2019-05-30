import {DataSource} from '@angular/cdk/table';
import {Venta} from '../interfaces/venta.interface';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {VentaService} from '../services/venta/venta.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CollectionViewer} from '@angular/cdk/collections';
import {catchError, delay, finalize, map} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

export class VentaDataSource implements DataSource<Venta> {
  private lessonsSubject = new BehaviorSubject<Venta[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
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
    // super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
    this.loadVentas();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(collectionViewer: CollectionViewer): Observable<Venta[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      // this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    const ventas = this.lessonsSubject.asObservable();

    return merge(ventas, ...displayDataChanges)
      .pipe(
        delay(0),
        map(() => {
          // Filter data
          this.filteredData = this.lessonsSubject.value.slice().filter((venta: Venta) => {
            // this.filteredData = this._exampleDatabase.data.slice().filter((venta: Venta) => {
            const searchStr = (venta.folio + venta.fecha + venta.escuela.nombre + venta.profesor.nombre).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });

          // Sort filtered data
          const sortedData = this.sortData(this.filteredData.slice());

          // Grab the page's slice of the filtered sorted data.
          const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
          this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
          return this.renderedData;
        }),
      );
  }

  disconnect(collectionViewer: CollectionViewer) {
    this.loadingSubject.complete();
    this.lessonsSubject.complete();
  }

  loadVentas() {
    this.loadingSubject.next(true);
    this._exampleDatabase.obtenerVentas()
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe(ventas => {
      console.log(ventas);
      this.lessonsSubject.next(ventas);
    });
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
        case 'folio':
          [propertyA, propertyB] = [a.folio, b.folio];
          break;
        case 'titulo':
          [propertyA, propertyB] = [a.fecha, b.fecha];
          break;
        case 'escuela':
          [propertyA, propertyB] = [a.escuela.nombre, b.escuela.nombre];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
