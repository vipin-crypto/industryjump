import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {Brand} from '../../models/brand';
import {FilterBody} from '../../requests/filter-body';
import {Resp} from '../../models/Resp';
import {UrlService} from '../../services/url/url.service';
import {ServiceModalComponent} from './service-modal/service-modal.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
declare var swal: any;
import Swal from 'sweetalert2';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-brand',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class BrandComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective
  totalItems: number;
  currentPage = 1;
  formData = new FormData();
  serialNumber = 0;
  imageUrl: string;
  seviceList: Array<Brand> = [];
  filterBody = new FilterBody();
  @ViewChild(ServiceModalComponent, {static: false}) modal: ServiceModalComponent;
  role: any;
  access: any;

  constructor(
    private api: ApiService,
    private url: UrlService,
    private common: CommonService

  ) { }
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  ngOnInit() :void {
    this.imageUrl=this.url.imageUrl
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  this.getService();
}
ngOnDestroy() {
  this.dtTrigger.unsubscribe();
}
  getService() {
    this.api.getAllService().subscribe((response: Resp) => {
      if (!response.success) return;
      this.seviceList = response.data;
      this.dtTrigger.next();

    });
  }
  deleteService(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Service!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.api.deleteService(id).subscribe((response: Resp) => {
          if (!response.success) return;
          Swal.fire({
            title: 'Deleted!',
            text: 'Poof! Your Service has been deleted!',
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
    this.api.editService(this.formData).subscribe((response: Resp) => {
      if (!response.success) return;
      this.common.successToast('Updated successfully!');
      this.rerender();
      this.formData=new FormData();

    })
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getService();
    });
  }

}
