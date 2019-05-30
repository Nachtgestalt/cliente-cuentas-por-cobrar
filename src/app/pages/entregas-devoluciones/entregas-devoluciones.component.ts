import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Inventario} from '../../interfaces/inventario.interface';
import {InventarioService} from '../../services/inventario/inventario.service';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {DataSource} from '@angular/cdk/collections';
import {ConfirmInventoryDialogComponent} from '../../dialogs/confirm-inventory/confirm-inventory.dialog.component';
import {catchError, debounceTime, delay, distinctUntilChanged, finalize, map} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-entregas-devoluciones',
  templateUrl: './entregas-devoluciones.component.html',
  styleUrls: ['./entregas-devoluciones.component.css']
})
export class EntregasDevolucionesComponent implements OnInit {
  displayedColumns = ['folio', 'titulo', 'escuela', 'cantidad', 'fecha', 'edit'];
  exampleDatabase: InventarioService | null;
  dataSource: InventarioDataSource | null;

  entrega: boolean;

  index: number;
  id: number;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;

  constructor(private httpClient: HttpClient,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new InventarioService(this.httpClient);
    this.dataSource = new InventarioDataSource(this.exampleDatabase, this.paginator, this.sort);
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

  confirm(i: number, idHistorial: number, folio: string, titulo: string, cantidad: number) {
    this.index = i;
    this.id = idHistorial;
    this.entrega = cantidad >= 0;
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
}

export class InventarioDataSource extends DataSource<Inventario> {
  private inventarioSubject = new BehaviorSubject<Inventario[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
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
    this.loadInventario();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Inventario[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      // this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    const inventarios = this.inventarioSubject.asObservable();

    return merge(inventarios, ...displayDataChanges)
      .pipe(
        delay(0),
        map(() => {
          // Filter data
          this.filteredData = this.inventarioSubject.value.slice().filter((inventario: Inventario) => {
            const searchStr = (inventario.folio + inventario.titulo).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });

          // Sort filtered data
          const sortedData = this.sortData(this.filteredData.slice());

          // Grab the page's slice of the filtered sorted data.
          const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
          this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
          return this.renderedData;
        })
      );
  }

  disconnect() {
    this.loadingSubject.complete();
    this.inventarioSubject.complete();
  }

  loadInventario() {
    this.loadingSubject.next(true);
    this._exampleDatabase.getInventario()
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe(inventario => {
      console.log(inventario);
      this.inventarioSubject.next(inventario);
    });
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
        case 'folio':
          [propertyA, propertyB] = [a.folio, b.folio];
          break;
        // case 'escuela': [propertyA, propertyB] = [`${a.escuela.clave}`, b.folio]; break;
        case 'titulo':
          [propertyA, propertyB] = [a.titulo, b.titulo];
          break;
        case 'cantidad':
          [propertyA, propertyB] = [a.cantidad, b.cantidad];
          break;
        case 'fecha':
          [propertyA, propertyB] = [a.fechaSolicitud, b.fechaSolicitud];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
