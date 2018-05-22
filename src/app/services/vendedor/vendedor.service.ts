import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Vendedor} from '../../interfaces/vendedor.interface';
import {URL_SERVICIOS} from '../../config/config';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class VendedorService {
  token = localStorage.getItem('token');
  vendedorURL = URL_SERVICIOS + '/vendedores';
  searchURL = URL_SERVICIOS + '/vendedores/search/';

  dataChange: BehaviorSubject<Vendedor[]> = new BehaviorSubject<Vendedor[]>([]);


  constructor(public http: HttpClient) { }

  get data(): Vendedor[] {
    return this.dataChange.value;
  }

  agregarUsuario(vendedor: Vendedor) {
    const url = this.vendedorURL + '/nuevo';
    const body = JSON.stringify(vendedor);

    console.log(body);

    return this.http.post(url, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  obtenerVendedores() {
    return this.http.get<Vendedor[]>(this.vendedorURL, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}})
      .subscribe(data => {
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log (error.name + ' ' + error.message);
        });
  }

  getVendedores() {
    return this.http.get(this.vendedorURL, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  existeClave(clave: string) {
    const url = this.searchURL + 'clave=' + clave;
    return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  existeRfc(rfc: string) {
    const url = this.searchURL + 'rfc=' + rfc;
    return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  existeUsername(username: string) {
    const url = this.searchURL + 'username=' + username;
    return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  existeEmail(email: string) {
    const url = this.searchURL + 'email=' + email;
    return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  deleteVendedor(clave: string) {
    const url = `${this.vendedorURL}/${clave}`;
    console.log('URL de borrado: ' + url);
    return this.http.delete(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  obtenerVendedor(clave: string) {
    const url = `${this.vendedorURL}/${clave}`;
    return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  actualizarVendedor(vendedor: any, clave: string) {
    const body = JSON.stringify(vendedor);
    return this.http.put(this.vendedorURL, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }
}
