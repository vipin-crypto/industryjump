import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../services/api/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CouponBody} from '../../../requests/coupon-body';
import {Categories} from '../../../models/categories';
import {Resp} from '../../../models/Resp';
import {CommonService} from "../../../services/common/common.service";

@Component({
  selector: 'app-edit-coupon',
  templateUrl: './edit-coupon.component.html',
  styleUrls: ['./edit-coupon.component.scss']
})
export class EditCouponComponent implements OnInit {
  history = window.history;
  body = new CouponBody();
  categoryList: Array<Categories> = [];
  min = new Date();
  couponId: string;
  bsConfig = Object.assign({isAnimated: true, showWeekNumbers: false, dateInputFormat: 'YYYY-MM-DD'}, {containerClass: 'theme-dark-blue'});
  flags = {
    isUpdate: false
  };

  constructor(
    private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((param: any) => {
      this.couponId = param.id;
      this.getCategories();
    });
  }
  getCategories() {
    this.api.getCategories().subscribe((response: Resp) => {
      if (!response.success) return;
      this.categoryList = response.data;
      this.getCouponDetails();
    });
  }
  getCouponDetails() {
    this.api.getCouponDetail(this.couponId).subscribe((response: Resp) => {
      if (!response.success) return;
      this.body = response.data;
      this.body.category = response.data.category ? response.data.category._id : '';
    });
  }
  editCoupon() {
    this.body.startDate= new Date(this.body.startDate).toISOString().slice(0,10);
    this.body.endDate= new Date(this.body.endDate).toISOString().slice(0,10);
    if(this.body.startDate > this.body.endDate)
    return this.common.errorToast('Please Enter valid Date')
    this.flags.isUpdate = true;
    this.body.id = this.couponId;
    this.api.editCoupon(this.body).subscribe((response: Resp) => {
      this.flags.isUpdate = false;
      if (!response.success) return;
      this.common.successToast('Coupon updated successfully!');
      this.router.navigateByUrl('/dashboard/coupons');
    }, error => {
      this.flags.isUpdate = false;
    });
  }

}
