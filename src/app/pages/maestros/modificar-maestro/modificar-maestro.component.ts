import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Escuela} from "../../../interfaces/escuela.interface";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from "@angular/material";
import {DataSource} from "@angular/cdk/collections";
import {Maestro} from "../../../interfaces/maestro.interface";
import {MaestroService} from "../../../services/maestro/maestro.service";
import {EscuelaDataSource} from "../../escuelas/modificar-escuela/modificar-escuela.component";
import {EscuelaService} from "../../../services/escuela/escuela.service";
import {HttpClient} from "@angular/common/http";
import {DeleteEscuelaDialogComponent} from "../../../dialogs/delete-escuela/delete-escuela.dialog.component";
import {DeleteProfesorDialogComponent} from "../../../dialogs/delete-profesor/delete-profesor.dialog.component";
import {onAction} from "sweetalert/typings/modules/actions";

@Component({
  selector: 'app-modificar-maestro',
  templateUrl: './modificar-maestro.component.html',
  styleUrls: ['./modificar-maestro.component.css']
})
export class ModificarMaestroComponent implements OnInit {
  displayedColumns = ['idprofesor', 'nombre', 'telefono', 'escuela', 'municipio', 'edit'];
  exampleDatabase: MaestroService | null;
  dataSource: MaestroDataSource | null;

  index: number;
  id: number;

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
    this.exampleDatabase = new MaestroService(this.httpClient);
    this.dataSource = new MaestroDataSource(this.exampleDatabase, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          console.log('Aqui viene la data: ' + this.dataSource);
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
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

  deleteItem(i: number, idprofesor: number, nombre: string) {
    this.index = i;
    this.id = idprofesor;
    const dialogRef = this.dialog.open(DeleteProfesorDialogComponent, {
      data: {clave: idprofesor, nombre: nombre}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.openSnackBar('Maestro eliminado', 'Aceptar');
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idprofesor === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}

export class MaestroDataSource extends DataSource<Maestro> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Maestro[] = [];
  renderedData: Maestro[] = [];

  constructor(public _exampleDatabase: MaestroService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Maestro[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.obtenerMaestros();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((maestro: Maestro) => {
        const searchStr = (maestro.idprofesor + maestro.nombre + maestro.apellidos).toLowerCase();
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
  sortData(data: Maestro[]): Maestro[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'clave': [propertyA, propertyB] = [a.idprofesor, b.idprofesor]; break;
        case 'nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
        case 'director': [propertyA, propertyB] = [a.apellidos, b.apellidos]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}


