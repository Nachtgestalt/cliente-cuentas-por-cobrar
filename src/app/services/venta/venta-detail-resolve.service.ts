import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {VentaService} from './venta.service';
import {Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class VentaDetailResolveService implements Resolve<any> {
  constructor(public _ventaService: VentaService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this._ventaService.obtenerVentas();
  }
}
