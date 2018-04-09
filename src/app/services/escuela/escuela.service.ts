import { Injectable } from '@angular/core';
import {URL_SERVICIOS} from '../../config/config';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Escuela} from '../../interfaces/escuela.interface';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Vendedor} from "../../interfaces/vendedor.interface";
import {Producto} from "../../interfaces/producto.interface";

@Injectable()
export class EscuelaService {
  token = localStorage.getItem('token');
  escuelaURL = URL_SERVICIOS + '/escuelas';

  dataChange: BehaviorSubject<Escuela[]> = new BehaviorSubject<Escuela[]>([]);

  constructor(public http: HttpClient) { }

  get data(): Escuela[] {
    return this.dataChange.value;
  }

  obtenerEscuela(clave: string) {
    const url = `${this.escuelaURL}/${clave}`;
    return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});

  }

  agregarEscuela(escuela: Escuela) {
    const url = this.escuelaURL + '/nuevo';
    const body = JSON.stringify(escuela);

    console.log(body);

    return this.http.post(url, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  actualizarEscuela(escuela: Escuela) {
    const body = JSON.stringify(escuela);
    return this.http.put(this.escuelaURL, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  obtenerEscuelas() {
    return this.http.get<Escuela[]>(this.escuelaURL, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}})
      .subscribe(data => {
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log (error.name + ' ' + error.message);
        });
  }

  getEscuelas() {
    return this.http.get<Escuela[]>(this.escuelaURL, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}})
  }

  borrarEscuela(clave: string) {
    const url = `${this.escuelaURL}/${clave}`;
    console.log('URL de borrado: ' + url);
    return this.http.delete(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }
}
