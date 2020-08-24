import { Component, OnInit, ViewChild } from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {Resp} from '../../models/Resp';
import {UserList} from '../../models/user-list';
import {FilterBody} from '../../requests/filter-body';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CommonService } from 'src/app/services/common/common.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  totalItems: number;
  selectedProduct:any
  currentPage = 1;
  serialNumber = 0;
  contactList: any;
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
    this.getContactList();
  }
  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getContactList();
    });
  }
  getContactList() {
   this.api.getContactList().subscribe((response: Resp) => {
      if (!response.success) return;
      this.contactList = response.data;
      this.dtTrigger.next();
    });
  }
}