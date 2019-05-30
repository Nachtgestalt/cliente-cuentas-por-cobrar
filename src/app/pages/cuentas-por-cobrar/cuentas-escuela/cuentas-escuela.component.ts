import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;

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
      const imgWidth = 295;
      const pageHeight = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('l', 'mm', 'a4'); // A4 size page of PDF
      const position = 10;
      pdf.addImage(contentDataURL, 'PNG', 10, position, imgWidth, imgHeight);
      const titlePDF = `CuentasXcobrar_Escuelas_Vendedor=${this.idVendedor}.pdf`;
      pdf.save(titlePDF); // Generated PDF
    });
  }
}
