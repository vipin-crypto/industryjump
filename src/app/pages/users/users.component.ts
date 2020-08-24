import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, } from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {Resp} from '../../models/Resp';
import {UserList} from '../../models/user-list';
import {FilterBody} from '../../requests/filter-body';
import { AngularCsv } from 'angular7-csv';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { CommonService } from 'src/app/services/common/common.service';

declare var swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  totalItems: number;
  selectedProduct:any
  currentPage = 1;
  serialNumber = 0;
  filterBody = new FilterBody();
  userList: Array<UserList> = []
  role: any;
  access: any;
  userListData: any;
  id: any;
  body: { isBlock: boolean; };
  constructor(
    private api: ApiService,
    private common :CommonService
  ) { }
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  ngOnInit():void {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
    this.getUserList();
    if (JSON.stringify(localStorage.getItem('Ginie_Admin'))) {
      this.role = JSON.parse(localStorage.getItem('Ginie_Admin'))._value.role
      this.access = JSON.parse(localStorage.getItem('Ginie_Admin'))._value.access
    }
  }
  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }
  approved(data,block) {
    this.id=data._id
    this.body = {
      'isBlock':block
   }
    this.api.approvedUser(this.body,this.id).subscribe((response: any) => {
      if (!response.success) return
      this.common.successToast(`Updated Successfully!`);
      this.rerender()   
     });
  }
  // ngAfterViewInit(): void {this.dtTrigger.next();}
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.getUserList();
      // this.dtTrigger.next();
    });
  }
  getUserList() {
    this.filterBody.role='CU'
   this.api.getUsers(this.filterBody.role).subscribe((response: Resp) => {
      if (!response.success) return;
      this.userList = response.data;
      this.dtTrigger.next();
    });
  }
  
  deleteUser(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.api.deleteUser(id).subscribe((response: Resp) => {
          if (!response.success) return;
          Swal.fire({
            title: 'Deleted!',
            text: 'Poof! Your User has been deleted!',
            icon: 'success'
          })
          this.rerender();
        })
      }
    })
  }
  // approved(data){
  //   this.body={
  //     'id':data.id,
  //     'isApproved':true,
  //    }
  //   this.api.editSeller(this.body).subscribe((response: Resp) => {
  //     if (response.success) 
  //     this.ngOnInit()
  //   });
  // }

  generateUserCsv() {
    this.filterBody.role='CU'
  this.api.getUsers(this.filterBody.role).subscribe((response: Resp) => {
    if (!response.success) return;
    this.userListData = response.data;
      
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      useBom: true,
      headers: ["Name ", "Email", "Contact Number" ,"Address", "City"  ,"State" ,"Country","Role"]
    };
    var data = [];
    this.userListData.forEach(element => {
      var firstN= element.firstName ? element.firstName :'' + '';
      var lastN = element.lastName ? element.lastName :'';
      var userName = (firstN + ' ' + lastN)
      var countryCode= element.countryCode ? element.countryCode :'' + '';
      var phone = element.phone ? element.phone :'';
      var Contact = (countryCode + ' ' + phone)
      data.push({
        username:userName,
        // username:element.firstName ? element.firstName :''+element.lastName ? element.lastName :'',
        Email:element.email ? element.email:'' ,
        contact:Contact,
        // Contact: element.countryCode ? element.countryCode:''+ element.phone ? element.phone:'',
        address:element.address ? element.address:'',
        city:element.city ? element.city:'',
        state:element.state ? element.state:'',
        country:element.country ? element.country:'',
        role:element.role?element.role:'',
        // Status: element.isApprove==true ? "Approved" : "Not-Approved",
        // createdAt : element.createdAt ? element.createdAt:''
            })
    });

    new AngularCsv(data,'User Report', options);
  })
} 
}
