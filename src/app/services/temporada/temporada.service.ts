import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Producto} from '../../interfaces/producto.interface';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Temporada} from '../../interfaces/temporada.interface';
import {URL_SERVICIOS} from '../../config/config';

@Injectable()
export class TemporadaService {
  token = localStorage.getItem('token');
  temporadaURL = URL_SERVICIOS + '/temporada';
  dataChange: BehaviorSubject<Temporada[]> = new BehaviorSubject<Temporada[]>([]);
  dialogData: any;

  get data(): Temporada[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  constructor(private http: HttpClient) { }

  agregarTemporada(temporada: Temporada) {
    const body = JSON.stringify(temporada);

    console.log(body);

    return this.http.post(this.temporadaURL, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  obtenerTemporadas() {
    return this.http.get<Temporada[]>(this.temporadaURL, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}})
      .subscribe(data => {
          // for (const temporada of data) {
          //   temporada.fecha_inicio = moment(temporada.fecha_inicio).locale('es').format('DD-MM-YYYY');
          //   temporada.fecha_termino = moment(temporada.fecha_termino).locale('es').format('DD-MM-YYYY');
          // }
          console.log(data);
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log (error.name + ' ' + error.message);
        });
  }

  getTemporadas() {
    return this.http.get(this.temporadaURL, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  getCurrentSeason() {
    return this.http.get(`${this.temporadaURL}/actual`, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  actualizarTemporada(temporada) {
    const body = JSON.stringify(temporada);
    console.log(body);
    return this.http.put(this.temporadaURL, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  getTemporada(id: any) {
    const url = `${this.temporadaURL}/${id}`
    return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }
}
