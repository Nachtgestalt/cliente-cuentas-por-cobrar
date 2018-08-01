import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Producto} from '../../interfaces/producto.interface';
import {Inventario} from '../../interfaces/inventario.interface';
import {ShowResurtidoInterface} from '../../interfaces/showResurtido.interface';
import * as moment from 'moment';

@Injectable()
export class InventarioService {
  token = localStorage.getItem('token');
  inventarioURL = URL_SERVICIOS + '/inventario';
  dataChange: BehaviorSubject<Inventario[]> = new BehaviorSubject<Inventario[]>([]);

  dataChangeResurtido: BehaviorSubject<ShowResurtidoInterface[]> = new BehaviorSubject<ShowResurtidoInterface[]>([]);

  constructor(private http: HttpClient) { }

  get data(): Inventario[] {
    return this.dataChange.value;
  }

  get dataResurtido(): ShowResurtidoInterface[] {
    return this.dataChangeResurtido.value;
  }

  confirmarPedido(idHistorial, cantidad) {
    const url = this.inventarioURL + '/confirmar';
    let headers = new HttpHeaders();
    headers  = headers.append('authorization', this.token);
    headers  = headers.append('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.append('idHistorial', idHistorial);
    params = params.append('entregados', cantidad);

    return this.http.get(url, {headers, params});
  }

  obtenerPDFXResurtido(folio, numpedido) {
    const url = `${this.inventarioURL}/pdfPedido`;
    let headers = new HttpHeaders();
    headers  = headers.append('authorization', this.token);
    headers  = headers.append('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.append('folio', folio);
    params = params.append('idHistorial', numpedido);

    return this.http.get(url, {headers, params, responseType: 'blob'})
      .map( res => {
        return new Blob([res], { type: 'application/pdf' });
      });

  }

  obtenerInventario() {
    return this.http.get<Inventario[]>(this.inventarioURL, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}})
      .map( (res: any) => {
        console.log(res);
          const inventarios: Inventario[] = [];
          for (const pedido of res) {
            const inventario: any = {
              escuela: `${pedido.venta.escuela.clave} - ${pedido.venta.escuela.nombre}`,
              idHistorial: pedido.idHistorial,
              cantidad: pedido.pedidos - pedido.entregados,
              folio: pedido.venta.folio,
              titulo: pedido.libro.titulo,
              fechaSolicitud: moment(pedido.fechaSolicitud).format('DD MMM YYYY') //parse integer
            };
            inventarios.push(inventario);
          }
          return inventarios;
        }
      )
      .subscribe(data => {
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log (error.name + ' ' + error.message);
        });
  }

  obtenerStocks() {
    return this.http.get<any[]>(`${this.inventarioURL}/stocks`, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}})
      .subscribe(data => {
        console.log(data);
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log (error.name + ' ' + error.message);
        });
    // return this.http.get(this.inventarioURL, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}})
  }

  obtenerResurtidos(folio) {
    const url = `${this.inventarioURL}/resurtidos=${folio}`;
    return this.http.get<any[]>(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}})
      .map(
        res => {
          for (const resurtido of res) {
            resurtido.fecha = moment(resurtido.fecha).format('DD MMM YYYY'); //parse integer
          }
          return res;
        }
      )
      .subscribe(data => {
          console.log(data);
          this.dataChangeResurtido.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log (error.name + ' ' + error.message);
        });
    // return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

}

