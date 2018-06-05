import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Producto} from '../../interfaces/producto.interface';
import {Inventario} from '../../interfaces/inventario.interface';

@Injectable()
export class InventarioService {
  token = localStorage.getItem('token');
  inventarioURL = URL_SERVICIOS + '/inventario';
  dataChange: BehaviorSubject<Inventario[]> = new BehaviorSubject<Inventario[]>([]);

  constructor(private http: HttpClient) { }

  get data(): Inventario[] {
    return this.dataChange.value;
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

  obtenerInventario() {
    return this.http.get<Inventario[]>(this.inventarioURL, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}})
      .map( (res: any) => {
        console.log(res);
          let inventarios: Inventario[] = [];
          for (let pedido of res) {
            let inventario: Inventario = {
              idHistorial: pedido.idHistorial,
              cantidad: pedido.pedidos - pedido.entregados,
              folio: pedido.venta.folio,
              titulo: pedido.libro.titulo
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


}

