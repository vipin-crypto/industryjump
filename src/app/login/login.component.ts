import { Component, OnInit } from '@angular/core';
import {bgScript} from '../../assets/js/custom';
import {LoginBody} from '../requests/login-body';
import { trigger, transition, useAnimation } from '@angular/animations';
import { shake } from 'ngx-animate';
import {ApiService} from '../services/api/api.service';
import {Resp} from '../models/Resp';
import {LocalStorageService} from 'angular-web-storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('shake', [transition('false => true', useAnimation(shake))])
  ]
})
export class LoginComponent implements OnInit {
  loginBody = new LoginBody();
  errorMessage = 'Error';
  flags = {
    isLogin: false,
    isError: false
  };

  constructor(
    private api: ApiService,
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    bgScript();
  }
  login() {
    this.flags.isLogin = true;
    this.api.singIn(this.loginBody).subscribe((response: Resp) => {
      this.flags.isLogin = false;
      if (!response.success) {
        this.errorMessage = response.message;
        this.flags.isError = true;
        return this.error();
      }
      this.localStorage.set('Ginie_Admin', response.data);
      this.localStorage.set('token',response.data.token)
      this.router.navigateByUrl('/dashboard/home');
    }, error => {
      this.flags.isLogin = false;
    });
  }
  error() {
    setTimeout(() => {
      this.flags.isError = false;
    }, 5000);
  }

}
