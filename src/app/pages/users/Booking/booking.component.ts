import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { Resp } from '../../../models/Resp';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { UrlService } from 'src/app/services/url/url.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class UserBookingComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  history = window.history;
  totalItems: number;
  selectedProduct:any
  currentPage = 1;
  serialNumber = 0;
  userId: any;
  selectedServiceList: Array<any> = [];
  selectedchatList: Array<any> = [];
  selectedUserList: any;
  selectedProviderList:any
  BookingList: any;
  chatData: any;
  senderId: any;
  constructor(private api: ApiService,
    private router: Router,
    private common: CommonService,
    private url: UrlService,
    private activatedRoute: ActivatedRoute) { }
    dtOptions: DataTables.Settings = {};
    dtTrigger = new Subject();
       
  ngOnInit() {
    this.activatedRoute.params.subscribe((param: any) => {
      this.userId = param.id;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
      this.getUserBooking();
    });
  }
  getUserBooking(){
    this.api.getUserBooking(this.userId).subscribe((response: Resp) => {
      if (!response.success) return;
      this.BookingList = response.data;
      this.dtTrigger.next();
    });
  }
 
  selectedChatList(item,id){
    this.chatData=item
    this.senderId=id

  }
}