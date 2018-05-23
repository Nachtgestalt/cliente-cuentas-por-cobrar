import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';
import {ResponseContentType} from '@angular/http';

@Injectable()
export class VentaService {

  ventasURL = URL_SERVICIOS + '/venta'
  token = localStorage.getItem('token');
  pdfURL = URL_SERVICIOS + '/inventario/pdf?folio=';

  constructor(public http: HttpClient) { }

  postVenta(venta) {
    const url = `${this.ventasURL}/nuevo`
    const body = JSON.stringify(venta);
    return this.http.post(url, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}})
  }

  getPFDVenta(folio) {
    // console.log(`${this.pdfURL}${folio}`);
    return this.http
      .get(`${this.pdfURL}${folio}`,{headers: {'authorization': this.token}, responseType: 'blob'})
      .map( res => {
          return new Blob([res], { type: 'application/pdf' });
        });
  }

  folioAsignadoVenta(folio) {
    const url = `${this.ventasURL}/search/folio=${folio}`;
    return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }
}
