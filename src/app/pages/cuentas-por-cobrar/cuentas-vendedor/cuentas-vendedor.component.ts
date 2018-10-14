import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CuentasXcobrarService} from '../../../services/cuentas-xcobrar/cuentas-xcobrar.service';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatSort} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CuentasVendedorDataSource} from '../../../datasources/cuentaVendedor.datasource';

@Component({
  selector: 'app-cuentas-vendedor',
  templateUrl: './cuentas-vendedor.component.html',
  styleUrls: ['./cuentas-vendedor.component.css']
})
export class CuentasVendedorComponent implements OnInit {
  season = JSON.parse(localStorage.getItem('season'));

  displayedColumns = ['clave', 'nombre', 'deuda', 'pagado', 'restante'];
  exampleDatabase: CuentasXcobrarService | null;
  dataSource: CuentasVendedorDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new CuentasXcobrarService(this.httpClient);
    this.dataSource = new CuentasVendedorDataSource(this.exampleDatabase, this.paginator, this.sort);
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

