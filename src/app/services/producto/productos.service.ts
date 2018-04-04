import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Producto } from '../../interfaces/producto.interface';
import 'rxjs/add/operator/map';
import {URL_SERVICIOS} from '../../config/config';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Vendedor} from "../../interfaces/vendedor.interface";

@Injectable()
export class ProductosService {
  token = localStorage.getItem('token');
  productoURL = URL_SERVICIOS + '/productos';
  dataChange: BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>([]);

  constructor(private http: HttpClient) { }

  get data(): Producto[] {
    return this.dataChange.value;
  }

  agregarProducto(producto: Producto) {
    const url = this.productoURL + '/nuevo';
    const body = JSON.stringify(producto);

    console.log(body);

    return this.http.post(url, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  obtenerProductos() {
    return this.http.get<Producto[]>(this.productoURL, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}})
      .subscribe(data => {
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log (error.name + ' ' + error.message);
        });
  }

  obtenerProducto(clave: string) {
    const url = `${this.productoURL}/${clave}`;
    return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  actualizarProducto(producto: Producto, clave: string) {
    const body = JSON.stringify(producto);
    return this.http.put(this.productoURL, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  borrarProducto(clave: string) {
    const url = `${this.productoURL}/${clave}`;
    console.log('URL de borrado: ' + url);
    return this.http.delete(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }
}

// solicitar(){
//   return this.http.get( this.url )
//             .map( res => {
//               console.log(res.json());
//             })

// }

