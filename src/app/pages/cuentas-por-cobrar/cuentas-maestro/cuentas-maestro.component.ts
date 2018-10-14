import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {CuentasXcobrarService} from '../../../services/cuentas-xcobrar/cuentas-xcobrar.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmPaymentComponent} from '../../../dialogs/confirm-payment/confirm-payment.component';
import {CuentasMaestroDataSource} from '../../../datasources/cuentasMaestro.datasource';

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
        this.parametros = parametros;
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
        source: {
          id: idProfesor,
          component: 'cuentas'
        },
        parametros: this.parametros,
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
