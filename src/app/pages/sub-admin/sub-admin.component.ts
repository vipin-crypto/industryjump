import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {CommonService} from '../../services/common/common.service';
import {FilterBody} from '../../requests/filter-body';
import {Resp} from '../../models/Resp';
import {SubAdminList} from '../../models/sub-admin-list';
declare var swal: any;

@Component({
  selector: 'app-sub-admin',
  templateUrl: './sub-admin.component.html',
  styleUrls: ['./sub-admin.component.scss']
})
export class SubAdminComponent implements OnInit {
  totalItems: number;
  currentPage = 1;
  serialNumber = 0;
  filterBody = new FilterBody();
  subAdminList: Array<SubAdminList> = [];

  constructor(
    private api: ApiService,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.filterBody.searchText=''
    this.getAllSubAdmin();
  }
  getAllSubAdmin() {
    this.api.getAllSubAdmin(this.filterBody).subscribe((response: Resp) => {
      if (!response.success) return;
      this.subAdminList = response.data;
      this.totalItems = response.count;
    });
  }
  deleteAdmin(id: string) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this sub-admin!',
      icon: 'warning',
      dangerMode: true,
      button: {
        text: 'Delete',
        closeModal: false
      }
    })
      .then((willDelete) => {
        if (willDelete) {
          this.api.deleteSubAdmin(id).subscribe((response: Resp) => {
            if (!response.success) return;
            swal('Poof! Your sub-admin has been deleted!', {
              icon: 'success',
            });
            this.getAllSubAdmin();
          });
        }
      });
  }
  updateAccess(item: SubAdminList) {
    item.id = item._id;
    this.api.editSubAdmin(item).subscribe((response: Resp) => {
      if (!response.success) return;
      this.common.successToast('Sub admin updated successfully!');
    });
  }
  onPageChange(page) {
    this.filterBody.skip = page.page - 1;
    this.serialNumber = this.filterBody.limit * this.filterBody.skip;
    this.getAllSubAdmin();
  }
  searchUser(){
    this.filterBody.searchText=this.filterBody.searchText.trim()
    this.getAllSubAdmin()
  }
  reset(){
    this.filterBody.searchText=''
    this.getAllSubAdmin()

  }
}
