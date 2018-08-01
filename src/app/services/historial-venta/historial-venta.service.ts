import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';
import {Producto} from '../../interfaces/producto.interface';

@Injectable()
export class HistorialVentaService {
  token = localStorage.getItem('token');
  urlHistorialVenta = `${URL_SERVICIOS}/historial_venta`;

  constructor(private http: HttpClient) { }

  getHistorialXFolio(folio) {
    const url = `${this.urlHistorialVenta}/venta=${folio}`;
    return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}})
      .map(
        (res: any)  => {
          let libro: Producto[] = [];
          for (let historial of res) {
            libro.push(historial.libro);
          }
          console.log(libro);
          console.log(res);
          return libro;
        }
      );
  }

  deleteResurtido(folio, numResurtido) {
    const url = `${this.urlHistorialVenta}/deleteResurtido`;
    let params = new HttpParams()
    params = params.append('folio', folio);
    params = params.append('numresurtido', numResurtido);
    return this.http.delete(url,{params});
  }

}
