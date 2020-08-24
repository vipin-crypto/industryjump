import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {LocalStorageService} from "angular-web-storage";
import {CommonService} from "../services/common/common.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private common: CommonService
  ) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.localStorage.get('Ginie_Admin')) {
      this.common.errorToast('Your session is expired, Please sign in.');
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
