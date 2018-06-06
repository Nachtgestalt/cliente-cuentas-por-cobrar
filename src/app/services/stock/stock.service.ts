import { Injectable } from '@angular/core';
import {URL_SERVICIOS} from '../../config/config';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class StockService {
  token = localStorage.getItem('token');
  stockURL = URL_SERVICIOS + '/stock';

  constructor(private http: HttpClient) { }

  postStock(stock) {
    const url = `${this.stockURL}/nuevo`;
    const body = JSON.stringify(stock);

    console.log(body);

    return this.http.post(url, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

}
