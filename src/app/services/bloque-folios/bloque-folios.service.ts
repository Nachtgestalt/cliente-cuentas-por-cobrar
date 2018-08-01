import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Escuela} from '../../interfaces/escuela.interface';
import {Maestro} from '../../interfaces/maestro.interface';

@Injectable()
export class BloqueFoliosService {
  token = localStorage.getItem('token');
  private urlBloqueFolios = URL_SERVICIOS + '/bloque_folio';

  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }

  get data(): Escuela[] {
    return this.dataChange.value;
  }

  agregarBloqueFolios(bloqueFolios) {
    const url = `${this.urlBloqueFolios}/nuevo`;
    const body = JSON.stringify(bloqueFolios);
    return this.http.post(url, body, {headers: {'Content-Type': 'application/json'}});
  }

  folioInRange(clave_vendedor: string, folio: string) {
    const url = `${this.urlBloqueFolios}/isValidFolio`;
    let headers = new HttpHeaders();
    headers  = headers.append('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.append('clave', clave_vendedor);
    params = params.append('valor', folio);
    return this.http.get(url, {headers, params})
  }

  obtenerBloqueFolios() {
    return this.http.get<any[]>(this.urlBloqueFolios)
      .subscribe((data: any[]) => {
          console.log(data);
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          // console.log (error.name + ' ' + error.message);
        });
  }

  existeFolioXVendedorTemporada(claveVendedor, tipoFolio, folio) {
    const url = `${this.urlBloqueFolios}/isValidFolioType`;
    let params = new HttpParams();
    params = params.append('clave', claveVendedor);
    params = params.append('valor', folio);
    params = params.append('type', tipoFolio);

    return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}, params});
  }

}
