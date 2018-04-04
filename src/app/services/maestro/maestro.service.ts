import { Injectable } from '@angular/core';
import {URL_SERVICIOS} from "../../config/config";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Escuela} from "../../interfaces/escuela.interface";
import {Maestro} from "../../interfaces/maestro.interface";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MaestroService {
  token = localStorage.getItem('token');
  escuelaURL = URL_SERVICIOS + '/profesores';

  dataChange: BehaviorSubject<Maestro[]> = new BehaviorSubject<Maestro[]>([]);
  constructor(public http: HttpClient) { }

  get data(): Maestro[] {
    return this.dataChange.value;
  }

  obtenerMaestro(clave: string) {
    const url = `${this.escuelaURL}/${clave}`;
    return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  agregarMaestro(maestro: Maestro) {
    const url = this.escuelaURL + '/nuevo';
    const body = JSON.stringify(maestro);

    console.log(body);

    return this.http.post(url, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});

  }

  actualizarMaestro(maestro: Maestro, clave: string) {
    const body = JSON.stringify(maestro);
    return this.http.put(this.escuelaURL, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }
}
