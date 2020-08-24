import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {CommonService} from '../../services/common/common.service';
import {FilterBody} from '../../requests/filter-body';
import {Resp} from '../../models/Resp';
import {Driver} from '../../models/driver';
declare var swal: any;

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  totalItems: number;
  currentPage = 1;
  serialNumber = 0;
  filterBody = new FilterBody();
  driverList: Array<Driver> = [];
  role: any;
  access: any;

  constructor(
    private api: ApiService,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.getDrivers();
    if (JSON.stringify(localStorage.getItem('Rupee_Admin'))) {
      this.role = JSON.parse(localStorage.getItem('Rupee_Admin'))._value.role
      this.access = JSON.parse(localStorage.getItem('Rupee_Admin'))._value.access
    }
  }
  getDrivers() {
    this.api.getDrivers(this.filterBody).subscribe((response: Resp) => {
      if (!response.success) return;
      this.driverList = response.data;
      this.totalItems = response.count;
    });
  }
  deleteAdmin(id: string) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this driver!',
      icon: 'warning',
      dangerMode: true,
      button: {
        text: 'Delete',
        closeModal: false
      }
    })
      .then((willDelete) => {
        if (willDelete) {
          this.api.deleteDriver(id).subscribe((response: Resp) => {
            if (!response.success) return;
            swal('Poof! Your driver has been deleted!', {
              icon: 'success',
            });
            this.getDrivers();
          });
        }
      });
  }
  approveDriver(item: Driver) {
    item.id = item._id;
    item.isApproved = true;
    this.api.editDriver(item).subscribe((response: Resp) => {
      if (!response.success) return;
      this.common.successToast('Driver updated successfully!');
    });
  }
  onPageChange(page) {
    this.filterBody.skip = page.page - 1;
    this.serialNumber = this.filterBody.limit * this.filterBody.skip;
    this.getDrivers();
  }
  searchUser(){
    this.filterBody.searchText=this.filterBody.searchText.trim()
    this.getDrivers()
  }
  reset(){
    this.filterBody.searchText=''
    this.getDrivers()

  }

}
