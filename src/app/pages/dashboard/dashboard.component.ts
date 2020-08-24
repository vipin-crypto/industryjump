import { Component, OnInit } from '@angular/core';
import * as js from '../../../assets/js/custom';
import { ApiService } from 'src/app/services/api/api.service';
import { Resp } from '../../models/Resp'
import * as _ from 'lodash';
import {chartAreaDemo} from '../../../assets/js/custom';
import {Router} from '@angular/router';

declare var window  :any 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  dashboardList;
  dashboardGraph;
  type:string;
  role:any;
  access:any;
  constructor(private api: ApiService,private router: Router,
) { }

  ngOnInit() {
    this.type='Month';
    js.pieChart();
    this.getDashboardData()
    this.getDashboardGraph();
    //  if (JSON.stringify(localStorage.getItem('Ginie_Admin'))) {
    //   this.role = JSON.parse(localStorage.getItem('Ginie_Admin'))._value.role
    //   this.access = JSON.parse(localStorage.getItem('Ginie_Admin'))._value.access
    // }
  }
  gotoServiceProvider(){
    this.router.navigateByUrl('/dashboard/provider');
 }
  gotoBooking(){ this.router.navigateByUrl('/dashboard/bookings');}
  gotoEarning(){}
  gotoservice(){
    this.router.navigateByUrl('/dashboard/service');
  }
  getDashboardData() {
    this.api.getDahboard().subscribe((response: Resp) => {
      if (!response.success) return;
      this.dashboardList = response.data;
     });
  }
    gotoUser(){
          this.router.navigateByUrl('/dashboard/users');
    }
     gotoSeller(){
      if(this.role=='SuperAdmin' || (this.role=='SubAdmin' && this.access.read==true))
          this.router.navigateByUrl('/dashboard/users');
    }
     gotoOffer(){
      if(this.role=='SuperAdmin' || (this.role=='SubAdmin' && this.access.read==true))
          this.router.navigateByUrl('/dashboard/offer');
    }
     gotoProduct(){
      if(this.role=='SuperAdmin' || (this.role=='SubAdmin' && this.access.read==true))
          this.router.navigateByUrl('/dashboard/products');
    }
     gotoCategory(){
          this.router.navigateByUrl('/dashboard/categories');
    }
     gotoBanner(){
      if(this.role=='SuperAdmin' || (this.role=='SubAdmin' && this.access.read==true))
          this.router.navigateByUrl('/dashboard/banner');
    }
  selectType(value){
    console.log('type',this.type)
    this.type=value
      this.getDashboardGraph()
  }

  getDashboardGraph() {
   this.api.getDahboardGraph({'type':this.type}).subscribe((response: Resp) => {
      if (!response.success) return;
      this.dashboardGraph = response.data;
      console.log(this.dashboardGraph)
      const month = [];
      const amount = [];
      this.dashboardGraph.forEach(ele => {
        console.log(ele.amount)
        month.push(ele.month);
        amount.push(ele.amount);
      })
      chartAreaDemo(month, amount);
     });
  }
}
