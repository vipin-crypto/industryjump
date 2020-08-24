import { Component, OnInit } from '@angular/core';
import {Access, AddSubAdminBody} from "../../../requests/add-sub-admin-body";
import {ApiService} from "../../../services/api/api.service";
import {CommonService} from "../../../services/common/common.service";
import {Router} from "@angular/router";
import {Resp} from "../../../models/Resp";

@Component({
  selector: 'app-add-sub-admin',
  templateUrl: './add-sub-admin.component.html',
  styleUrls: ['./add-sub-admin.component.scss']
})
export class AddSubAdminComponent implements OnInit {
  history = window.history;
  access = new Access();
  body = new AddSubAdminBody();
  flags = {
    isAdded: false
  };

  constructor(
    private api: ApiService,
    private common: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  addSubAdmin() {
    this.flags.isAdded = true;
    this.body.access = this.access;
    this.api.addSubAdmin(this.body).subscribe((response: Resp) => {
      this.flags.isAdded = false;
      if (!response.success) return;
      this.common.successToast('Sub admin added successfully!');
      this.router.navigateByUrl('/dashboard/sub-admin');
    }, error => {
      this.flags.isAdded = false;
    });
  }

}
