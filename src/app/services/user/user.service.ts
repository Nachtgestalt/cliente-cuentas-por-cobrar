import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/operators';
import {User} from '../../interfaces/user.interfaces';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {
  usuarioURL = URL_SERVICIOS + '/users';
  token: string;
  user: User;

  constructor(public http: HttpClient,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.loadStorage();
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  setInStorage(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  loadStorage () {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  autenticar(user: User) {
    const url = URL_SERVICIOS + '/login';
    const body = JSON.stringify(user);

    return this.http.post(url, body, {observe: 'response'})
      .map((resp: HttpResponse<any>) => {
        this.token = resp.headers.get('authorization');
        return this.token;
      });
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  obtenerUsuario(user: User) {
    const url = URL_SERVICIOS + '/users/logincheck';
    const body = JSON.stringify(user);
    return this.http.post(url, body,
      {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  agregarUsuario(user: User) {
    const url = URL_SERVICIOS + '/users/sign-up';
    const body = JSON.stringify(user);

    console.log(body);

    return this.http.post(url, body, {headers: {'Content-Type': 'application/json'}});
  }

  obtenerUsuarios() {
    return this.http.get( this.usuarioURL);
  }

  borrarUsuario(key$: string) {
    const url = `${ this.usuarioURL}/${key$}`;
    return this.http.delete(url);
  }

}
