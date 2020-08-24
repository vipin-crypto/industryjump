import { Component, OnInit } from '@angular/core';
import {Categories} from '../../../models/categories';
import {ApiService} from '../../../services/api/api.service';
import {Resp} from '../../../models/Resp';
import {CouponBody} from '../../../requests/coupon-body';
import {CommonService} from '../../../services/common/common.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss']
})
export class AddCouponComponent implements OnInit {
  history = window.history;
  categoryList: Array<Categories> = [];
  body = new CouponBody();
  min = new Date();
  bsConfig = Object.assign({isAnimated: true, showWeekNumbers: false, dateInputFormat: 'YYYY-MM-DD'}, {containerClass: 'theme-dark-blue'});
  flags = {
    isAdded: false
  };
  constructor(
    private api: ApiService,
    private common: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCategories();
  }
  getCategories() {
    this.api.getCategories().subscribe((response: Resp) => {
      if (!response.success) return;
      this.categoryList = response.data;
    });
  }
  addCoupon() {
    this.body.startDate= new Date(this.body.startDate).toISOString().slice(0,10);
    this.body.endDate= new Date(this.body.endDate).toISOString().slice(0,10);
    if(this.body.startDate > this.body.endDate)
    return this.common.errorToast('Please Enter valid Date ')
    this.flags.isAdded = true;
    this.api.addCoupon(this.body).subscribe((response: Resp) => {
      this.flags.isAdded = false;
      if (!response.success) return;
      this.common.successToast('Coupon added successfully!');
      this.router.navigateByUrl('/dashboard/coupons');
    }, error => {
      this.flags.isAdded = false;
    });
  }

}
