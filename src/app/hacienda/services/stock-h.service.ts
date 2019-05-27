import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockHService {

  constructor(private http: HttpClient) {}

  listStock() {
    const url = `${URL_SERVICIOS}/inventario/stocks`;
    const params = new HttpParams().append('hacienda', '1');
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(url, {headers, params});
  }

  createStock(stock) {
    const url = `${URL_SERVICIOS}/stock/nuevo`;
    const body = stock;
    body.hacienda = 1;
    const params = new HttpParams().append('hacienda', '1');
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    console.log(body);

    return this.http.post(url, body, {headers, params});
  }
}
