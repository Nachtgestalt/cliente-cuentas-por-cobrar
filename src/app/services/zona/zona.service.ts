import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Temporada} from '../../interfaces/temporada.interface';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {URL_SERVICIOS} from '../../config/config';
import {Zona} from '../../interfaces/zona.interface';
import {Escuela} from '../../interfaces/escuela.interface';

@Injectable()
export class ZonaService {
  token = localStorage.getItem('token');
  zonaURL = URL_SERVICIOS + '/zona';
  dataChange: BehaviorSubject<Zona[]> = new BehaviorSubject<Zona[]>([]);
  dialogData: any;

  get data(): Zona[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  constructor(private http: HttpClient) { }

  obtenerZonas() {
    return this.http.get<Zona[]>(this.zonaURL, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}})
      .subscribe(data => {
        console.log(data);
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log (error.name + ' ' + error.message);
        });
  }

  getZonas() {
    return this.http.get(this.zonaURL, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}} )
  }

  agregarZona(zona) {
    const url = this.zonaURL + '/nuevo';
    const body = JSON.stringify(zona);
    return this.http.post(url, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  actualizarZona(zona) {
    const body = JSON.stringify(zona);
    this.dialogData = zona;
    console.log(this.dialogData);
    return this.http.put(this.zonaURL, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }
}
