import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, } from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {Resp} from '../../models/Resp';
import {UserList} from '../../models/user-list';
import {FilterBody} from '../../requests/filter-body';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  totalItems: number;
  selectedProduct:any
  currentPage = 1;
  serialNumber = 0;
  filterBody = new FilterBody();
  selectedServiceList: Array<any> = [];
  selectedchatList: Array<any> = [];
  selectedUserList: any;
  selectedProviderList:any
  role: any;
  senderId:any;
  body: { id: any; status: any; reason:any;};
  bsConfig = Object.assign({ isAnimated: true, showWeekNumbers: false, dateInputFormat: 'YYYY-MM-DD' }, { containerClass: 'theme-dark-blue' });
  access: any;
  BookingList:any
  chatData: any;
  startDate: string 
  endDate: string 
  toDate: string;
  filter:any=''
  scheduleTime: any;
  constructor(
    private api: ApiService,
    private common: CommonService
  ) { }
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  ngOnInit():void {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
    this.getBookingList();
    if (JSON.stringify(localStorage.getItem('Ginie_Admin'))) {
      this.role = JSON.parse(localStorage.getItem('Ginie_Admin'))._value.role
      this.access = JSON.parse(localStorage.getItem('Ginie_Admin'))._value.access
    }
  }
  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getBookingList();
    });
  }
  selectedChatList(item,id){
    console.log(item)
    this.chatData=item
    this.senderId=id
  }
  getBookingList() {
   this.api.getAllBooking(this.filter).subscribe((response: Resp) => {
      if (!response.success) return;
      this.BookingList = response.data;
      this.dtTrigger.next();
    });
  }
  cancel(data) {
   Swal.fire({
    title: 'Are you sure?',
    text: "Please Enter Reason",
    icon: 'warning',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes',
    allowOutsideClick: false,
  }).then((result) => {
    if (result.value ) {
       console.log(result.value);
        this.body={
      'id':data._id,
      'status':"Canceled",
      'reason':result.value
      }
       this.api.Cancelbooking(this.body).subscribe((response: Resp) => {
      if (response.success) 
         Swal.fire(
                'Booking  Cancled!',
                '',
                'success'
              )
      this.rerender()
    });
  }
    else{
    console.log("cancel for  active user")
      this.rerender()

    }
  });

}
searchUser() {
  this.startDate  = new Date(this.startDate).toISOString().slice(0, 10);
  this.endDate = new Date(this.endDate).toISOString().slice(0, 10);
  let data ={
    'startDate': this.startDate,
    'endDate': this.endDate
  }
  if (this.startDate > this.endDate){
    return this.common.errorToast('Enter valid Date ')}
    else{
      this.filter=data
        this.rerender()
    }
  }
processOrder(id: string, state: string, index: number) {
  this.body={
    'id':id,
    'status':state,
    'reason':''
    }
  this.api.Cancelbooking(this.body).subscribe((response: Resp) => {
    if (!response.success) return;
    this.common.successToast(`Booking ${state} successfully!`);
    this.rerender()
    // this.BookingList[index].status = response.data.status;
  });
}
reset(){
  this.filter=''
  this.startDate=''
  this.endDate=''
  this.rerender()
}
selectedscheduleTimeList(item){
  this.scheduleTime=item
}
}