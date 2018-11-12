import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {ComisionesService} from '../../../services/comisiones/comisiones.service';
import {ConfirmPaymentComponent} from '../../../dialogs/confirm-payment/confirm-payment.component';
import {HistoryVendedorComponent} from '../../../dialogs/history-comisiones/history-vendedor/history-vendedor.component';
import {ReportesService} from '../../../services/reportes/reportes.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ComisionesVendedorDataSource} from '../../../datasources/comisionesVendedor.datasource';

import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-comisiones-vendedor',
  templateUrl: './comisiones-vendedor.component.html',
  styleUrls: ['./comisiones-vendedor.component.css']
})
export class ComisionesVendedorComponent implements OnInit {

  season = JSON.parse(localStorage.getItem('season'));

  displayedColumns = ['id', 'nombre', 'deuda', 'pagado', 'restante', 'options'];
  exampleDatabase: ComisionesService | null;
  dataSource: ComisionesVendedorDataSource | null;
  isLoadingResults = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private httpClient: HttpClient,
              public _reportesService: ReportesService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new ComisionesService(this.httpClient);
    this.dataSource = new ComisionesVendedorDataSource(this.exampleDatabase, this.paginator, this.sort);
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

  confirm(i: number, idVendedor: number, nombre: string, restante: number) {

    const dialogRef = this.dialog.open(ConfirmPaymentComponent, {
      data: {
        source: {
          id: idVendedor,
          component: 'ComisionesVendedor'
        },
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

  historial(id: number) {
    const dialogRef = this.dialog.open(HistoryVendedorComponent, {
      data: {
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
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

  getDeudaTotal() {
    return this.dataSource.renderedData.map(t => t.deuda).reduce((acc, value) => acc + value, 0);
  }

  getRestanteTotal() {
    return this.dataSource.renderedData.map(t => t.restante).reduce((acc, value) => acc + value, 0);
  }

  getPagadoTotal() {
    return this.dataSource.renderedData.map(t => t.pagado).reduce((acc, value) => acc + value, 0);
  }

  reporteComisiones(id?) {
    this.isLoadingResults = true;
    let pdfResult;
    const params = {
      tipo: 1,
      temporada: this.season.idtemporada,
      id: id ? id : null
    };
    this._reportesService.reporteComisiones(params).subscribe(
      (data: any) => {
        this.isLoadingResults = false;
        console.log(data);
        pdfResult = this.domSanitizer.bypassSecurityTrustResourceUrl(
          URL.createObjectURL(data)
        );
        window.open(pdfResult.changingThisBreaksApplicationSecurity);
        console.log(pdfResult);
      },
      (error) => {
        swal('Error al cargar el reporte', 'Algo ha salido mal', 'error');
        console.error(error);
        this.isLoadingResults = false;
      });
  }
}
