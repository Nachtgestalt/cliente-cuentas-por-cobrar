import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator, MatSort} from '@angular/material';
import {CuentasXcobrarService} from '../../../services/cuentas-xcobrar/cuentas-xcobrar.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CuentasEscuelaDataSource} from '../../../datasources/cuentasEscuela.datasource';

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
