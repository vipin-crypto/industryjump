import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {CommonService} from '../common/common.service';
import {LocalStorageService} from "angular-web-storage";

@Injectable({
  providedIn: 'root'
})
export class GetInterceptorService {

  constructor(
    private common: CommonService,
    private router: Router,
    private localStorage: LocalStorageService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.common.hideSpinner();
        console.log(event);
        if ((event.status == 200 && !event.body.success) && event.url.split('/').pop() != 'countryCode.json') this.error(event.body.message);
      }
    }, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        this.common.hideSpinner();
        if (error.status == 401 || error.status == 403) {
          this.error('Your session is expired, please sign in.');
          this.localStorage.clear();
          return this.router.navigateByUrl('/login');
        } else {
          return alert(error.message);
        }
      }
    }));
  }
  error = message => {
    this.common.errorToast(message);
  }
}
