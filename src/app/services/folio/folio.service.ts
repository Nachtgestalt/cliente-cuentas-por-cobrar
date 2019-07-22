import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {URL_SERVICIOS} from '../../config/config';
import {Folio} from '../../interfaces/folio.interface';

@Injectable()
export class FolioService {
  token = localStorage.getItem('token');
  foliosURL = URL_SERVICIOS + '/Folio';
  dataChange: BehaviorSubject<Folio[]> = new BehaviorSubject<Folio[]>([]);
  temporada = JSON.parse(localStorage.getItem('season'));
  idTemporada = this.temporada.idtemporada;
  constructor(private http: HttpClient) { }

  get data(): Folio[] {
    return this.dataChange.value;
  }

  obtenerFolios() {
    const url = `${this.foliosURL}/Temporada/${this.idTemporada}`;
    const headers = new HttpHeaders().append('Content-Type', 'application/json' );
    return this.http.get<Folio[]>(`${url}`, {headers})
      .subscribe(data => {
        console.log(data);
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log (error.name + ' ' + error.message);
        });
  }

  agregarFolio(folio) {
    const body = JSON.stringify(folio);
    console.log(folio);
    return this.http.post(this.foliosURL, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  actualizarFolio(folio) {
    const body = JSON.stringify(folio);
    console.log(folio);
    return this.http.put(this.foliosURL, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});

  }

  getFoliosTemporada(id) {
    const url = `${this.foliosURL}/Temporada/${id}`;
    return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  verificarRangoFolio(valor, tipo) {
    console.log('Este es el tipo', tipo);
    const url = `${this.foliosURL}/range`;
    let params = new HttpParams();
    params = params.append('tipo', tipo);
    params = params.append('valor', valor);
    return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}, params});
  }
}
