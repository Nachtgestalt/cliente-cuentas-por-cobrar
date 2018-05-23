import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductosService} from '../../services/producto/productos.service';
import {Inventario} from '../../interfaces/inventario.interface';
import {InventarioService} from '../../services/inventario/inventario.service';
import {ProductoDataSource} from '../almacen/modificar-producto/modificar-producto.component';
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import {DeleteProductoDialogComponent} from '../../dialogs/delete-producto/delete-producto.dialog.component';
import {Producto} from '../../interfaces/producto.interface';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-entregas-devoluciones',
  templateUrl: './entregas-devoluciones.component.html',
  styleUrls: ['./entregas-devoluciones.component.css']
})
export class EntregasDevolucionesComponent implements OnInit {
  displayedColumns = ['folio', 'titulo', 'cantidad', 'edit'];
  exampleDatabase: InventarioService | null;
  dataSource: InventarioDataSource | null;

  index: number;
  id: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private httpClient: HttpClient,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) { }

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

  confirm(i: number, clave: string, titulo: string, autor: string) {
    this.index = i;
    this.id = clave;
    console.log('Esta es la clave: ' + clave);
    // const dialogRef = this.dialog.open(DeleteInventarioDialogComponent, {
    //   data: {clave: clave, titulo: titulo, autor: autor}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === 1) {
    //     this.openSnackBar('Inventario eliminado', 'Aceptar');
    //     const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.clave_inventario === this.id);
    //     // for delete we use splice in order to remove single object from DataService
    //     this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
    //     this.refreshTable();
    //   }
    // });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
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

    this._exampleDatabase.obtenerInventario();

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
