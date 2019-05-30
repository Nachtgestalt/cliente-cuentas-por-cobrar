import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {InventarioService} from '../../services/inventario/inventario.service';
import {AddTemporadaComponent} from '../add-temporada/add-temporada.dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {ShowResurtidoInterface} from '../../interfaces/showResurtido.interface';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import * as moment from 'moment';
import {HistorialVentaService} from '../../services/historial-venta/historial-venta.service';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import swal from 'sweetalert';

@Component({
  selector: 'app-show-resurtidos',
  templateUrl: './show-resurtidos.dialog.component.html',
  styleUrls: ['./show-resurtidos.dialog.component.css']
})
export class ShowResurtidosDialogComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'));
  noData = false;
  displayedColumns = ['numresurtido', 'fecha', 'edit'];
  exampleDatabase: InventarioService | null;
  dataSource: ShowResurtidoInterfaceDataSource | null;

  index: number;
  id: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;

  constructor(private httpClient: HttpClient,
              private _historialVentaService: HistorialVentaService,
              public _inventarioService: InventarioService,
              public dialogRef: MatDialogRef<AddTemporadaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new InventarioService(this.httpClient);
    this.dataSource = new ShowResurtidoInterfaceDataSource(this.exampleDatabase, this.paginator, this.sort, this.data.folio);
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

  printPDF(numresurtido) {
    let pdfResult;
    this._inventarioService.obtenerPDFXResurtido(this.data.folio, numresurtido)
      .subscribe(
        (data: any) => {
          console.log(data);
          // var fileURL = URL.createObjectURL(data);
          // window.open(fileURL, 'reporte de venta');
          pdfResult = this.domSanitizer.bypassSecurityTrustResourceUrl(
            URL.createObjectURL(data)
          );
          window.open(pdfResult.changingThisBreaksApplicationSecurity);
          console.log(pdfResult);
        }
      );
  }


  deleteResurtido(numResurtido) {
    swal({
      title: '¿Estas seguro?',
      text: 'Una vez eliminado el resurtido, no hay vuelta atras',
      icon: 'warning',
      buttons: {
        cancel: true,
        confirm: true
      },
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          this._historialVentaService.deleteResurtido(this.data.folio, numResurtido)
            .subscribe(
              res => {
                console.log(res);
                swal('Resurtido eliminado exitosamente', {
                  icon: 'success',
                });
                this.loadData();
              },
              error => {
                swal('Algo salio mal', 'No se pudo eliminar este resurtido', {
                  icon: 'error',
                });
              }
            );
        }
      });
  }

}

export class ShowResurtidoInterfaceDataSource extends DataSource<ShowResurtidoInterface> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: ShowResurtidoInterface[] = [];
  renderedData: ShowResurtidoInterface[] = [];

  constructor(public _exampleDatabase: InventarioService,
              public _paginator: MatPaginator,
              public _sort: MatSort,
              public folio) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ShowResurtidoInterface[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChangeResurtido,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.obtenerResurtidos(this.folio);

    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.dataResurtido.slice().filter((resurtido: ShowResurtidoInterface) => {
        const searchStr = (resurtido.numresurtido + moment(resurtido.fecha).format('DD MMM YYYY')).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    }));
  }

  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: ShowResurtidoInterface[]): ShowResurtidoInterface[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      console.log('No se ontoy!');
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'numresurtido':
          [propertyA, propertyB] = [a.numresurtido, b.numresurtido];
          break;
        case 'fecha':
          [propertyA, propertyB] = [a.fecha, b.fecha];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}

