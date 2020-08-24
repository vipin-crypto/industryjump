import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {FilterBody} from '../../requests/filter-body';
import {Resp} from '../../models/Resp';
import {Coupon} from '../../models/coupon';
import {CommonService} from '../../services/common/common.service';
declare var swal: any;

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  totalItems: number;
  currentPage = 1;
  serialNumber = 0;
  filterBody = new FilterBody();
  couponList: Array<Coupon> = []
  ;
  role: any;
  access: any;

  constructor(
    private api: ApiService,
    private common: CommonService
  ) { }

  ngOnInit() {
    if (JSON.stringify(localStorage.getItem('Rupee_Admin'))) {
      this.role = JSON.parse(localStorage.getItem('Rupee_Admin'))._value.role
      this.access = JSON.parse(localStorage.getItem('Rupee_Admin'))._value.access
    }
    this.getCoupons();
  }
  getCoupons() {
    this.api.getAllCoupons(this.filterBody).subscribe((response: Resp) => {
      if (!response.success) return;
      this.couponList = response.data;
      this.totalItems = response.count;
    });
  }
  deleteCoupon(id: string) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this coupon!',
      icon: 'warning',
      dangerMode: true,
      button: {
        text: 'Delete',
        closeModal: false
      }
    })
      .then((willDelete) => {
        if (willDelete) {
          this.api.deleteCoupon(id).subscribe((response: Resp) => {
            if (!response.success) return;
            swal('Poof! Your coupon has been deleted!', {
              icon: 'success',
            });
            this.getCoupons();
          });
        }
      });
  }
  updateStatus(item: Coupon) {
    this.api.editCoupon({id: item._id, activeStatus: item.activeStatus}).subscribe((response: Resp) => {
      if (!response.success) return;
      this.common.successToast('Coupon updated successfully!');
    });
  }
  onPageChange(page) {
    this.filterBody.skip = page.page - 1;
    this.serialNumber = this.filterBody.skip * this.filterBody.limit;  }

}
