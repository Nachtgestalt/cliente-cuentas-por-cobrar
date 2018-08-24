import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';
import {Maestro} from '../../interfaces/maestro.interface';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Inventario} from '../../interfaces/inventario.interface';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CuentasXcobrarService {
  URLCuentasXCobrar = `${URL_SERVICIOS}/cuentas`;

  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  dataChangeEscuela: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  dataChangeMaestro: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  public loadingSubject = new BehaviorSubject<boolean>(false);

  get data(): any[] {
    return this.dataChange.value;
  }

  get dataEscuela(): any[] {
    return this.dataChangeEscuela.value;
  }

  get dataMaestro(): any[] {
    return this.dataChangeMaestro.value;
  }

  constructor(private http: HttpClient) { }

  getCuentasXVendedor(idTemporada) {
    const url = `${this.URLCuentasXCobrar}/cuentasByVendedor`;
    let params = new HttpParams();
    params = params.append('idtemporada', idTemporada);

    return this.http.get<any[]>(url, {params})
      .subscribe(data => {
          console.log(data);
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log (error.name + ' ' + error.message);
        });
  }

  getCuentasXVendedorEscuela(idTemporada, claveVendedor: string) {
    const url = `${this.URLCuentasXCobrar}/cuentasByEscuela`;
    let params = new HttpParams();
    params = params.append('idtemporada', idTemporada);
    params = params.append('claveV', claveVendedor);
    console.log('Clave del vendedor', claveVendedor);

    return this.http.get<any[]>(url, {params})
      .subscribe(data => {
          console.log(data);
          this.dataChangeEscuela.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log (error.name + ' ' + error.message);
        },
      () => {
        this.loadingSubject.next(false);
    });
  }

  getCuentasXVendedorEscuelaMaestro(idTemporada, claveVendedor, claveEscuela) {
    const url = `${this.URLCuentasXCobrar}/cuentasByProfesor`;
    let params = new HttpParams();
    params = params.append('idtemporada', idTemporada);
    params = params.append('claveV', claveVendedor);
    params = params.append('claveE', claveEscuela);

    return this.http.get<any[]>(url, {params})
      .subscribe(data => {
          console.log(data);
          this.dataChangeMaestro.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log (error.name + ' ' + error.message);
        });
  }

  abonar(idProfesor, idTemporada, value: string, parametros) {
    const url = `${this.URLCuentasXCobrar}/abonar`;
    let params = new HttpParams();
    params = params.append('monto', value);
    params = params.append('claveV', parametros.claveVendedor);
    params = params.append('claveE', parametros.claveEscuela);
    params = params.append('idprofesor', idProfesor);
    params = params.append('idtemporada', idTemporada);

    return this.http.get(url, {params});
  }

  abonoRapido(folio, monto) {
    const url = `${this.URLCuentasXCobrar}/abonoRapido`;
    let params = new HttpParams();
    params = params.append('monto', monto);
    params = params.append('folio', folio);

    return this.http.get(url, {params});
  }
}
