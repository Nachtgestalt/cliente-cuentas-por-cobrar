import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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

  folioInRange(clave_vendedor: string, folio: string) {
    const url = `${this.urlBloqueFolios}/isValidFolio`;
    let headers = new HttpHeaders();
    headers  = headers.append('authorization', this.token);
    headers  = headers.append('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.append('clave', clave_vendedor);
    params = params.append('valor', folio);
    return this.http.get(url, {headers, params});
  }

}
