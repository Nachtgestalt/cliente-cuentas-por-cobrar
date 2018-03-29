import { Injectable } from '@angular/core';
import {User} from '../../interfaces/user.interfaces';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Vendedor} from '../../interfaces/vendedor.interface';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

class Obsevable {
}

@Injectable()
export class VendedorService {
  token = localStorage.getItem('token');
  vendedorURL = 'http://localhost:8080/vendedores';
  searchURL = 'http://localhost:8080/vendedores/search/';


  constructor(public http: HttpClient,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  agregarUsuario(vendedor: Vendedor) {
    let url = this.vendedorURL + '/nuevo';
    const body = JSON.stringify(vendedor);

    console.log(body);

    return this.http.post(url, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  obtenerVendedores() {
    return this.http.get(this.vendedorURL, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  existeClave(clave: string) {
    let url = this.searchURL + 'clave=' + clave;
    return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  existeRfc(rfc: string) {
    let url = this.searchURL + 'rfc=' + rfc;
    return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  existeUsername(username: string) {
    let url = this.searchURL + 'username=' + username;
    return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  existeEmail(email: string) {
    let url = this.searchURL + 'email=' + email;
    return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }
}
