import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient} from '@angular/common/http';
import {DataSource} from '@angular/cdk/collections';
import {Folio} from '../../../interfaces/folio.interface';
import {FolioService} from '../../../services/folio/folio.service';
import {DeleteFolioDialogComponent} from '../../../dialogs/delete-folio/delete-folio.dialog..component';
import {AddFolioDialogComponent} from '../../../dialogs/add-folio/add-folio.dialog.component';

import {fromEvent, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-folios',
  templateUrl: './folios.component.html',
  styleUrls: ['./folios.component.css']
})
export class FoliosComponent implements OnInit {
  displayedColumns = ['temporada', 'tipo', 'inicio', 'fin', 'edit'];
  exampleDatabase: FolioService | null;
  dataSource: FolioDataSource | null;

  index: number;
  id: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private httpClient: HttpClient,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) {
  }

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
    this.exampleDatabase = new FolioService(this.httpClient);
    this.dataSource = new FolioDataSource(this.exampleDatabase, this.paginator, this.sort);
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

  startEdit(i: number, idfolios: number, tipo: string, nombreTemporada: string, inicio: number, fin: number) {
    this.id = idfolios;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(AddFolioDialogComponent, {
      data: {
        idfolios: idfolios,
        tipo: tipo,
        nombreTemporada: nombreTemporada,
        inicio: inicio,
        fin: fin,
        edit: true
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  deleteItem(i: number, clave: number, titulo: string, autor: string) {
    this.index = i;
    this.id = clave;
    console.log('Esta es la clave: ' + clave);
    const dialogRef = this.dialog.open(DeleteFolioDialogComponent, {
      data: {clave: clave, titulo: titulo, autor: autor}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.openSnackBar('Folio eliminado', 'Aceptar');
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idfolios === this.id);
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

  agregarFolio(folio: Folio) {
    const dialogRef = this.dialog.open(AddFolioDialogComponent, {
      data: {folio: folio}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.exampleDatabase.dataChange.value.push(this._temporadaService.getDialogData());
        // this.refreshTable();
      }
    });
  }
}

export class FolioDataSource extends DataSource<Folio> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Folio[] = [];
  renderedData: Folio[] = [];

  constructor(public _exampleDatabase: FolioService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Folio[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.obtenerFolios();

    return merge(...displayDataChanges)
      .pipe(
        map(() => {
          // Filter data
          this.filteredData = this._exampleDatabase.data.slice().filter((folio: Folio) => {
            const searchStr = (folio.idtemporada.nombre + folio.tipo + folio.inicio + folio.fin).toLowerCase();
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
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: Folio[]): Folio[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'temporada':
          [propertyA, propertyB] = [a.idtemporada.nombre, b.idtemporada.nombre];
          break;
        case 'tipo':
          [propertyA, propertyB] = [a.tipo, b.tipo];
          break;
        case 'inicio':
          [propertyA, propertyB] = [a.inicio, b.inicio];
          break;
        case 'fin':
          [propertyA, propertyB] = [a.fin, b.fin];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
