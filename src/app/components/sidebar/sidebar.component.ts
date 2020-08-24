import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  user: any;
  menuItems = [];
  dashboard: any;
  category: string;
  product: string;
  subcategory: string;
  order: string;
  setting: string;
  subadmin: string;
  driver: string;
  provider: string;
  coupon: string;
  service: string;
  offer: string;
  role: any;
  access: any;
  booking: any;
  attribute: any;
  giftcard: any;
  contact: any;
  suggestion: string;
  cms: any;

  constructor() {
    this.dashboard = 'assets/icons/dashboard.png',
     this.user = 'assets/icons/group.png',
    this.category = 'assets/icons/category.png'
    this.product = 'assets/icons/product.png'
    this.subcategory = 'assets/icons/sub-category.png'
    this.order = 'assets/icons/order.png'
    this.setting = 'assets/icons/gear.png'
    this.subadmin = 'assets/icons/sub-admin.png'
    this.driver = 'assets/icons/driver-icon.png'
    this.provider = 'assets/icons/Provider-management.png'
    this.coupon = 'assets/icons/coupon.png'
    this.service = 'assets/icons/service-management.png'
    this.offer = 'assets/icons/offer.png',
    this.giftcard = 'assets/icons/gift-card.png',
    this.contact = 'assets/icons/contact.png'
    this.booking = 'assets/icons/booking.png'
    this.suggestion ='assets/icons/suggestion.png',
    this.cms ='assets/icons/cms.png'

  }
  // user:any;


  ngOnInit() {
    this.menuItems = [
      { path: '/dashboard/home', title: 'Dashboard', icon: this.dashboard, class: '' },
      { path: '/dashboard/users', title: 'User Management', icon: this.user, class: '' },
      { path: '/dashboard/provider', title: 'Provider Management', icon: this.provider, class: '' },
      { path: '/dashboard/categories', title: 'Category', icon: this.category, class: '' },
      { path: '/dashboard/service', title: 'Service Management', icon: this.service, class: '' },
      {path: '/dashboard/bookings', title: 'Bookings', icon: this.booking, class: ''},
      {path: '/dashboard/contact', title: 'Contact', icon: this.contact, class: ''},
      {path: '/dashboard/suggestions', title: 'Suggestions', icon: this.suggestion, class: ''},
      {path: '/dashboard/cms', title: 'CMS Pages', icon: this.cms, class: ''},
      {path:'/dashboard/commission', title: 'Commission', icon: this.coupon, class: ''}

      // 


    ];


  }

}
