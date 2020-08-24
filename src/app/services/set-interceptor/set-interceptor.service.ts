import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageService} from 'angular-web-storage';
import {AppComponent} from "../../app.component";
import {CommonService} from "../common/common.service";

@Injectable({
  providedIn: 'root'
})
export class SetInterceptorService {
  constructor(
    private localStorage: LocalStorageService,
    private common: CommonService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedReq = this.handleRequest(req);
    this.common.showSpinner();
    return next.handle(clonedReq);
  }
  handleRequest(req: HttpRequest<any>) {
    const user = this.localStorage.get('Ginie_Admin');
    let authReq;
    authReq = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'tId': user ? user.token : ''
      })
    });
    if ((req.method.toLowerCase() == 'post' || req.method.toLowerCase() == 'put') && req.body instanceof FormData) {
      authReq = req.clone({
        headers: new HttpHeaders({
          'tId': user ? user.token : ''
        })
      });
    }
    return authReq;
  }
}
