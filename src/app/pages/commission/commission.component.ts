import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {Resp} from '../../models/Resp';
import {FilterBody} from '../../requests/filter-body';
import {Categories} from '../../models/categories';
import {UrlService} from '../../services/url/url.service';
import {CommissionModalComponent} from "./commission-modal/commission-modal.component";
declare var swal: any;
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { CommonService } from 'src/app/services/common/common.service';
@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.scss']
})
export class CommissionComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective
  totalItems: number;
  currentPage = 1;
  serialNumber = 0;
  filterBody = new FilterBody();
  commissionList: Array<any> = [];
  imageUrl: string;
  formData = new FormData();

  flags = {
    isEdit: false
  };
  @ViewChild(CommissionModalComponent, {static: false}) public modalComponent: CommissionModalComponent;
  role: any;
  access: any;

  constructor(
    private api: ApiService,
    private url: UrlService,
    private common: CommonService,
  ) { }
   dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  ngOnInit() :void {
    this.imageUrl=this.url.imageUrl
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  this.getCommission();
  if (JSON.stringify(localStorage.getItem('Ginie_Admin'))) {
    this.role = JSON.parse(localStorage.getItem('Ginie_Admin'))._value.role
    this.access = JSON.parse(localStorage.getItem('Ginie_Admin'))._value.access
  }
}
ngOnDestroy() {
  this.dtTrigger.unsubscribe();
}
getCommission() {
    this.api.getAllCommission().subscribe((response: Resp) => {
      if (!response.success) return;
      this.commissionList = response.data;
      this.dtTrigger.next(); 

    });
  }
  deleteCommision(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Commission!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.api.deleteCommission(id).subscribe((response: Resp) => {
          if (!response.success) return;
          Swal.fire({
            title: 'Deleted!',
            text: 'Poof! Your Commission has been deleted!',
            icon: 'success'
          })
          this.rerender();
        })
      }
    })
  }
  
  Active(item){
    this.formData.append('id', item._id);
    this.formData.append('isActive',item.isActive);
    this.api.updateCategory(this.formData).subscribe((response: Resp) => {
      if (!response.success) return;
      this.common.successToast('Updated successfully!');
      this.rerender();
      this.formData=new FormData();

    })
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.getCommission();
      // this.dtTrigger.next();
    });
  }


}