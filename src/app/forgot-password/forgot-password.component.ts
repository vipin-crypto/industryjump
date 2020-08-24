import { Component, OnInit } from '@angular/core';
import {bgScript} from '../../assets/js/custom';
import {ApiService} from "../services/api/api.service";
import {CommonService} from "../services/common/common.service";
import {Resp} from "../models/Resp";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  flags = {
    isChanged: false
  };
  params: any;

  constructor(
    private api: ApiService,
    private common: CommonService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    bgScript();
    this.activatedRoute.params.subscribe((params: any) => {
      this.params = JSON.parse(atob(params.id));
      console.log(this.params);
    });
  }
  resetPassword(body: any) {
    if (body.password != body.confirmPassword) return this.common.errorToast('New password & confirm password does not match.');
    this.flags.isChanged = true;
    body.id = this.params.user;
    body.link = this.params.link;
    this.api.resetPassword(body).subscribe((response: Resp) => {
      this.flags.isChanged = false;
      if (!response.success) return;
      this.common.successToast('Password changed successfully!');
      this.router.navigateByUrl('/login');
    }, error => {
      this.flags.isChanged = false;
    });
  }


}
