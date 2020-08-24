import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ApiService} from './services/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'GinieAdminPortal';
  loginBody = {email: '', password: ''};
  constructor(
    private spinner: NgxSpinnerService
  ) {
  }
  ngOnInit() {
  }
  show() {
    this.spinner.show();
  }
  hide() {
    this.spinner.hide();
  }
}
