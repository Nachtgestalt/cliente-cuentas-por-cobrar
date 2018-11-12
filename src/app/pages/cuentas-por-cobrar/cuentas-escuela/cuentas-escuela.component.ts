import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator, MatSort} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {CuentasXcobrarService} from '../../../services/cuentas-xcobrar/cuentas-xcobrar.service';
import {CuentasEscuelaDataSource} from '../../../datasources/cuentasEscuela.datasource';

import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

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

  getDeudaTotal() {
    return this.dataSource.renderedData.map(t => t.deuda).reduce((acc, value) => acc + value, 0);
  }

  getRestanteTotal() {
    return this.dataSource.renderedData.map(t => t.restante).reduce((acc, value) => acc + value, 0);
  }

  getPagadoTotal() {
    return this.dataSource.renderedData.map(t => t.pagado).reduce((acc, value) => acc + value, 0);
  }

  convertToPdf() {
    const data = document.getElementById('tableToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      let imgWidth = 295;
      let pageHeight = 208;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('l', 'mm', 'a4'); // A4 size page of PDF
      let position = 10;
      pdf.addImage(contentDataURL, 'PNG', 10, position, imgWidth, imgHeight);
      const titlePDF = `CuentasXcobrar_Escuelas_Vendedor=${this.idVendedor}.pdf`;
      pdf.save(titlePDF); // Generated PDF
    });
  }
}
