import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';
import {ResponseContentType} from '@angular/http';
import {Venta} from '../../interfaces/venta.interface';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Inventario} from '../../interfaces/inventario.interface';
import {Vendedor} from '../../interfaces/vendedor.interface';

@Injectable()
export class VentaService {
  ventasURL = URL_SERVICIOS + '/venta'
  token = localStorage.getItem('token');
  pdfURL = URL_SERVICIOS + '/venta/pdf?folio=';

  dataChange: BehaviorSubject<Venta[]> = new BehaviorSubject<Venta[]>([]);

  constructor(public http: HttpClient) { }

  get data(): Venta[] {
    return this.dataChange.value;
  }

  getVentas() {
    return this.http.get<Venta[]>(this.ventasURL, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}})
      // .map( (res: any) => {
          // let ventas: Venta[] = [];
          // for (let venta of res) {
          //   let venta: Venta = {
          //     idHistorial: venta.folio,
          //     // cantidad: venta.ventas - venta.entregados,
          //     // folio: venta.venta.folio,
          //     // titulo: venta.libro.titulo
          //   };
          //   ventas.push(venta);
          // }
          // return ventas;
        // }
      // )
      .subscribe(data => {
          console.log(data);
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log (error.name + ' ' + error.message);
        });
  }

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
