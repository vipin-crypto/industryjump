import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from 'angular-web-storage';
import {Router} from '@angular/router';
import * as js from '../../../assets/js/custom';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {

  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    js.removeBg();
  }
  logout() {
    this.localStorage.clear();
    document.getElementById('closeLogoutModal').click();
    this.router.navigateByUrl('/login');
  }

}
