import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TokenInterceptorService {

  private token: string = '';

  constructor() {
    this.token = localStorage.getItem('token')
  }

  public intercept( req: HttpRequest<any>,
                    next: HttpHandler ): Observable<HttpEvent<any>> {
    const authorizationReq = this.setAuthHeader(req);
    const handledRequest = next.handle(authorizationReq);
    return handledRequest;
  }

  private setAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
    const authorization = `${this.token}`;
    console.log(authorization);
    const headers = req.headers.set('Authorization', authorization);
    const authorizationReq = req.clone({ headers });
    return authorizationReq;
  }

}
