import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';
import {map} from 'rxjs/operators';

@Injectable()
export class ReportesService {
  reportesURL = URL_SERVICIOS + '/reportes';

  constructor(private http: HttpClient) { }

  reporteZonas(vendedor?) {
    let params = new HttpParams();
    if ( vendedor ) {
      params = params.append('vendedor', vendedor);
    }
    return this.http.get(`${this.reportesURL}/pdfZona`, {responseType: 'blob', params})
      .pipe(
        map(res => {
          return new Blob([res], { type: 'application/pdf' });
        })
      );
  }

  reporteInventario() {
    return this.http.get(`${this.reportesURL}/inventario`, {responseType: 'blob'})
      .pipe(
        map(res => {
          return new Blob([res], { type: 'application/pdf' });
        })
      );
  }

  reporteVenta(parametros) {
    let params = new HttpParams();
    if (parametros.fecha_inicio) {
      params = params.append('fechaInicial', parametros.fecha_inicio);
    }
    if (parametros.fecha_fin) {
      params = params.append('fechaFinal', parametros.fecha_fin);
    }
    if (parametros.libro) {
      params = params.append('libro', parametros.libro);
    }
    if (parametros.vendedor) {
      params = params.append('vendedor', parametros.vendedor);
    }
    if (parametros.tipo_pedido) {
      params = params.append('tipoPedido', parametros.tipo_pedido);
    }
    return this.http.get(`${this.reportesURL}/Venta`, {responseType: 'blob', params})
      .pipe(
        map(res => {
          return new Blob([res], { type: 'application/pdf' });
        })
      );
  }

  reporteCobranza(parametros) {
    let params = new HttpParams();
    if (parametros.fecha_inicio) {
      params = params.append('fechaInicial', parametros.fecha_inicio);
    }
    if (parametros.fecha_fin) {
      params = params.append('fechaFinal', parametros.fecha_fin);
    }
    if (parametros.vendedor) {
      params = params.append('vendedor', parametros.vendedor);
    }
    if (parametros.escuela) {
      params = params.append('escuela', parametros.escuela);
    }
    return this.http.get(`${this.reportesURL}/Cobranza`, {responseType: 'blob', params})
      .pipe(
        map(res => {
          return new Blob([res], { type: 'application/pdf' });
        })
      );
  }

  reporteComisiones(parametros) {
    let params = new HttpParams();
    params = params.append('tipo', parametros.tipo);
    if (parametros.id) {
      params = params.append('id', parametros.id);
    }
    if (parametros.temporada) {
      params = params.append('temporada', parametros.temporada);
    }
    return this.http.get(`${this.reportesURL}/Comisiones`, {responseType: 'blob', params})
      .pipe(
        map(res => {
          return new Blob([res], { type: 'application/pdf' });
        })
      );
  }

  reporteGanancia(parametros) {
    let params = new HttpParams();
    if (parametros.fecha_inicio) {
      params = params.append('fechaInicial', parametros.fecha_inicio);
    }
    if (parametros.fecha_fin) {
      params = params.append('fechaFinal', parametros.fecha_fin);
    }
    if (parametros.libro) {
      params = params.append('libro', parametros.libro);
    }
    if (parametros.vendedor) {
      params = params.append('vendedor', parametros.vendedor);
    }
    if (parametros.tipo_pedido) {
      params = params.append('tipoPedido', parametros.tipo_pedido);
    }
    return this.http.get(`${this.reportesURL}/Ganancia`, {responseType: 'blob', params})
      .pipe(
        map(res => {
          return new Blob([res], { type: 'application/pdf' });
        })
      );
  }
}
