import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api/api.service";
import {CommonService} from "../../services/common/common.service";
import {Admin} from "../../models/Admin";
import {Resp} from "../../models/Resp";
import {ChangePasswordBody} from "../../requests/change-password-body";

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  history = window.history;
  admin = new Admin();
  changePassBody = new ChangePasswordBody();
  flags = {
    isUpdate: false,
    isPassChange: false
  };

  constructor(
    private api: ApiService,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.getProfile();
  }
  getProfile() {
    this.api.getProfile().subscribe((response: Resp) => {
      if (!response.success) return;
      this.admin = response.data;
    });
  }
  updateProfile() {
    this.flags.isUpdate = true;
    this.api.updateProfile(this.admin).subscribe((response: Resp) => {
      this.flags.isUpdate = false;
      if (!response.success) return;
      this.common.successToast('Profile updated successfully!')
      this.getProfile();
    }, error => {
      this.flags.isUpdate = false;
    });
  }
  changePassword() {
    this.flags.isPassChange = true;
    this.api.changePassword(this.changePassBody).subscribe((response: Resp) => {
      this.flags.isPassChange = false;
      if (!response.success) return;
      this.common.successToast('Password changed successfully!');
      this.changePassBody = new ChangePasswordBody();
    }, error => {
      this.flags.isPassChange = false;
    });
  }

}
