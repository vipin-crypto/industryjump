import { Component, OnInit } from '@angular/core';
import {Access, AddSubAdminBody} from "../../../requests/add-sub-admin-body";
import {ApiService} from "../../../services/api/api.service";
import {CommonService} from "../../../services/common/common.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Resp} from "../../../models/Resp";

@Component({
  selector: 'app-edit-sub-admin',
  templateUrl: './edit-sub-admin.component.html',
  styleUrls: ['./edit-sub-admin.component.scss']
})
export class EditSubAdminComponent implements OnInit {
  history = window.history;
  access = new Access();
  adminId: string;
  body = new AddSubAdminBody();
  flags = {
    isUpdate: false
  };

  constructor(
    private api: ApiService,
    private common: CommonService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((param: any) => {
      this.adminId = param.id;
      this.getAdminDetail();
    });
  }
  getAdminDetail() {
    this.api.getAdminDetails(this.adminId).subscribe((response: Resp) => {
      if (!response.success) return;
      this.body = response.data;
      this.access = this.body.access;
    });
  }
  editSubAdmin() {
    this.flags.isUpdate = true;
    this.body.access = this.access;
    this.api.editSubAdmin(this.body).subscribe((response: Resp) => {
      this.flags.isUpdate = false;
      if (!response) return;
      this.common.successToast('Sub admin updated successfully!');
      this.router.navigateByUrl('/dashboard/sub-admin');
    }, error => {
      this.flags.isUpdate = false;
    });
  }

}
