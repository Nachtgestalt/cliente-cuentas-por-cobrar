import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';

@Injectable()
export class BloqueFoliosService {
  token = localStorage.getItem('token');
  private urlBloqueFolios = URL_SERVICIOS + '/bloque_folio';

  constructor(private http: HttpClient) { }

  agregarBloqueFolios(bloqueFolios) {
    const url = `${this.urlBloqueFolios}/nuevo`;
    const body = JSON.stringify(bloqueFolios);
    return this.http.post(url, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

}
