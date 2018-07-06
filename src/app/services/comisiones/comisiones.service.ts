import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ComisionesService {
  URLComisiones = `${URL_SERVICIOS}/comision`;

  dataChangeDirector: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  dataChangeVendedor: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  get dataDirector(): any[] {
    return this.dataChangeDirector.value;
  }

  get dataVendedor(): any[] {
    return this.dataChangeVendedor.value;
  }

  constructor(private http: HttpClient) { }

  getComisionesXVendedor(idTemporada) {
    const url = `${this.URLComisiones}/comisionVendedor`;
    let params = new HttpParams();
    params = params.append('idtemporada', idTemporada);

    return this.http.get<any[]>(url, {params})
      .subscribe(data => {
          console.log(data);
          this.dataChangeVendedor.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log (error.name + ' ' + error.message);
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
          console.log (error.name + ' ' + error.message);
        });
  }

}
