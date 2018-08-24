import { Injectable } from '@angular/core';
import {URL_SERVICIOS} from '../../config/config';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
@Injectable()
export class StockService {
  token = localStorage.getItem('token');
  stockURL = URL_SERVICIOS + '/stock';

  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);


  get data(): any[] {
    return this.dataChange.value;
  }

  constructor(private http: HttpClient) { }

  postStock(stock) {
    const url = `${this.stockURL}/nuevo`;
    const body = JSON.stringify(stock);

    console.log(body);

    return this.http.post(url, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  getStockByBook(id) {
    const url = `${this.stockURL}/libro=${id}`;

    return this.http.get(url)
      .pipe(
        map(
          (res: any) => {
            for ( const venta of res) {
              venta.fecha_entrada = moment(venta.fecha_entrada).locale('es').format('DD MMM YYYY'); //parse integer
            }
            return res;
          }
        )
      )
      .subscribe((data: any) => {
        console.log(data);
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }
}
