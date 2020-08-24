import { Component, OnInit } from '@angular/core';
import {removeBg} from '../../assets/js/custom';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if (location.pathname.replace('/', '').split('/').length <= 1) removeBg();
  }
  back() {
    if (location.pathname.replace('/', '').split('/').length > 1) {
      return true;
    } else {
      return false;
    }
  }

}
