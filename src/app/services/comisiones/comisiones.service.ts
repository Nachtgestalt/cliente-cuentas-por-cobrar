import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ComisionesService {
  URLComisiones = `${URL_SERVICIOS}/comision`;

  dataChangeDirector: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  dataChangeVendedor: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  dataChangeLider: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  dataChangeComisionVendedor: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  dataChangeComisionLider: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  dataChangeComisionDirector: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  get dataDirector(): any[] {
    return this.dataChangeDirector.value;
  }

  get dataVendedor(): any[] {
    return this.dataChangeVendedor.value;
  }

  get dataLider(): any[] {
    return this.dataChangeLider.value;
  }

  get dataComisionVendedor(): any[] {
    return this.dataChangeComisionVendedor.value;
  }

  get dataComisionLider(): any[] {
    return this.dataChangeComisionLider.value;
  }

  get dataComisionDirector(): any[] {
    return this.dataChangeComisionDirector.value;
  }

  constructor(private http: HttpClient) {
  }

  getComisionesXVendedor(idTemporada) {
    const url = `${this.URLComisiones}/comisionVendedor`;
    let params = new HttpParams();
    params = params.append('idtemporada', idTemporada);

    return this.http.get<any[]>(url, {params})
      .subscribe(data => {
          this.dataChangeVendedor.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        });
  }

  getComisionesXDirector(idTemporada) {
    const url = `${this.URLComisiones}/comisionDirector`;
    let params = new HttpParams();
    params = params.append('idtemporada', idTemporada);

    return this.http.get<any[]>(url, {params})
      .subscribe(data => {
          console.log(data);
          this.dataChangeDirector.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        });
  }

  getComisionesXLider(idTemporada) {
    const url = `${this.URLComisiones}/comisionLider`;
    let params = new HttpParams();
    params = params.append('idtemporada', idTemporada);

    return this.http.get<any[]>(url, {params})
      .subscribe(data => {
          console.log(data);
          this.dataChangeLider.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        });
  }

  getComisionXVendedor(idTemporada, clave) {
    const url = `${this.URLComisiones}/comisionesVendedor`;
    let params = new HttpParams();
    params = params.append('idtemporada', idTemporada);
    params = params.append('clave', clave);

    return this.http.get<any[]>(url, {params})
      .subscribe(data => {
          console.log(data);
          this.dataChangeComisionVendedor.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        });
  }

  getComisionXDirector(idTemporada, clave) {
    const url = `${this.URLComisiones}/comisionesDirector`;
    let params = new HttpParams();
    params = params.append('idtemporada', idTemporada);
    params = params.append('iddirector', clave);

    return this.http.get<any[]>(url, {params})
      .subscribe(data => {
          console.log(data);
          this.dataChangeComisionDirector.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        });
  }

  getComisionXLider(idTemporada, clave) {
    const url = `${this.URLComisiones}/comisionesLider`;
    let params = new HttpParams();
    params = params.append('idtemporada', idTemporada);
    params = params.append('idlider', clave);

    return this.http.get<any[]>(url, {params})
      .subscribe(data => {
          console.log(data);
          this.dataChangeComisionLider.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        });
  }

  postAbonarComisionVendedor(idTemporada, monto, idVendedor) {
    const body = {
      monto: monto,
      temporada: idTemporada,
      vendedor: idVendedor
    };
    console.log(body);
    const url = `${this.URLComisiones}/abonarVendedor`;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(url, body, {headers});

  }

  postAbonarComisionDirector(idTemporada, monto, idDirector) {
    const body = {
      monto: monto,
      temporada: idTemporada,
      director: idDirector
    };
    const url = `${this.URLComisiones}/abonarDirector`;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(url, body, {headers});

  }

  postAbonarComisionLider(idTemporada, monto, idLider) {
    const body = {
      monto: monto,
      temporada: idTemporada,
      lider: idLider
    };
    const url = `${this.URLComisiones}/abonarLider`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(url, body, {headers});

  }

}
