import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Resp } from '../../models/Resp';
import { UserList } from '../../models/user-list';
import { FilterBody } from '../../requests/filter-body';
import { AngularCsv } from 'angular7-csv';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { CommonService } from 'src/app/services/common/common.service';
import { UrlService } from 'src/app/services/url/url.service';

declare var swal: any;

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  totalItems: number;
  selectedProduct: any
  currentPage = 1;
  serialNumber = 0;
  filterBody = new FilterBody();
  userList: Array<UserList> = []
  role: any;
  access: any;
  rating: number = 2.5;
  userListData: any;
  body: {isApprove: boolean,isBlock:boolean};
  id: any; 
  imageUrl: string;
  documents: any;
  constructor(
    private api: ApiService,
    private common:CommonService,
    private url: UrlService

  ) { }
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.imageUrl=this.url.imageUrl
    this.getUserList();
    this.api.getStaticPages().subscribe(
            (data: any) => {
              if (data.success) {
                this.documents = data.data.documents
              }
      
            })
  }
  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getUserList();
    });
  }
  getUserList() {
    this.filterBody.role = 'SP'
    this.api.getUsers(this.filterBody.role).subscribe((response: Resp) => {
      if (!response.success) return;
      this.userList = response.data;
      this.dtTrigger.next();
    });
  }
  deleteUser(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this provider!',
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
            text: 'Poof! Your Provider has been deleted!',
            icon: 'success'
          })
          this.rerender();
        })
      }
    })
  }
  approved(data,isApprove,isblock) {
    this.id=data._id
    this.body = {
      'isApprove':isApprove ,
      'isBlock':isblock
   }
    this.api.approvedUser(this.body,this.id).subscribe((response: any) => {
      if (!response.success) return
      this.common.successToast(`Updated Successfully!`);
      this.rerender()   
     });
  }

  generateProviderCsv() {
    this.filterBody.role = 'SP'
    this.api.getUsers(this.filterBody.role).subscribe((response: Resp) => {
      if (!response.success) return;
      this.userListData = response.data;

      var options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        useBom: true,
        headers: ["Name ", "Email", "Contact Number", "Address", "City", "State", "Country", "Role", "Status"]
      };
      var data = [];
      this.userListData.forEach(element => {
        var countryCode = element.countryCode ? element.countryCode : '' + '';
        var phone = element.phone ? element.phone : '';
        var Contact = (countryCode + ' ' + phone)
        data.push({
          username: element.name ? element.name : '',
          Email: element.email ? element.email : '',
          Contact: Contact,
          address: element.address ? element.address : '',
          city: element.city ? element.city : '',
          state: element.state ? element.state : '',
          country: element.country ? element.country : '',
          role: element.role ? element.role : '',
          Status: element.isApprove == true ? "Approved" : "Not-Approved",
        })
      });

      new AngularCsv(data, 'Providers Report', options);
    })
  }
}
