import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {Resp} from '../../models/Resp';
import {FilterBody} from '../../requests/filter-body';
import {Categories} from '../../models/categories';
import {UrlService} from '../../services/url/url.service';
import {CategoryModalComponent} from "./category-modal/category-modal.component";
declare var swal: any;
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { CommonService } from 'src/app/services/common/common.service';
import * as _ from 'lodash';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  transferArrayItem
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective
  totalItems: number;
  currentPage = 1;
  serialNumber = 0;
  filterBody = new FilterBody();
  categoryList: Array<Categories> = [];
  imageUrl: string;
  formData = new FormData();

  flags = {
    isEdit: false
  };
  @ViewChild(CategoryModalComponent, {static: false}) public modalComponent: CategoryModalComponent;
  role: any;
  access: any;
  changeNumber: any;
  new: any;
 
  // currentPage: Number;
  constructor(
    private api: ApiService,
    private url: UrlService,
    private common: CommonService,
  ) { }
   dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  ngOnInit() :void {
     this.currentPage = 1;
    this.imageUrl=this.url.imageUrl
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  this.getCategories();
  if (JSON.stringify(localStorage.getItem('Ginie_Admin'))) {
    this.role = JSON.parse(localStorage.getItem('Ginie_Admin'))._value.role
    this.access = JSON.parse(localStorage.getItem('Ginie_Admin'))._value.access
  }
}
 onDrop(event: CdkDragDrop<string[]>) {

   console.log(event ,"event ")
    moveItemInArray(this.categoryList, event.previousIndex, event.currentIndex);
    this.categoryList = this.categoryList.filter((o, index) => {
      console.log(index);
      return o.serialNumber = index + 1;
    })
    console.log(this.categoryList);
    this.api.changeOrder({list: this.categoryList}).subscribe((response: any) => {});

    
    // const current = this.categoryList[event.currentIndex].serialNumber;
    // const previous = this.categoryList[event.previousIndex].serialNumber;
    // console.log(current,previous,"drag")
    // this.categoryList[event.previousIndex].serialNumber = current;
    // this.categoryList[event.currentIndex].serialNumber = previous;
    // console.log( current,previous,"drop")
    // this.changeNumber = current;
    // this.new = previous
    // console.log(current ,previous,this.categoryList,"=====")
    // this.categoryList.forEach(element => {
    //   if(element.serialNumber == current ){
    //  var  Data = new FormData();
    //  Data.append('serialNumber',this.new);
    //   Data.append('id', element._id);
    //   console.log(element.serialNumber ,current,this.new)
    //   this.api.updateCategory(Data).subscribe((response: any) => {
    //   });}
    //   if(element.serialNumber == previous){
    //     var  Data = new FormData();
    //     Data.append('serialNumber',this.changeNumber);
    //      Data.append('id', element._id);
    //      this.api.updateCategory(Data).subscribe((response: any) => {
    //      });}
    //   // console.log(element)     
    // });
  }
  error = message => {
    this.common.errorToast(message);
  }
 
ngOnDestroy() {
  this.dtTrigger.unsubscribe();
}
  getCategories() {
    this.api.getAllCategories(this.filterBody).subscribe((response: any) => {
      if (!response.success) return;
      this.categoryList = response.data;
      this.totalItems = response.count;

      // this.dtTrigger.next(); 

    });
  }
  deleteCategory(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.api.deleteCategory(id).subscribe((response: Resp) => {
          if (!response.success) return;
          Swal.fire({
            title: 'Deleted!',
            text: 'Poof! Your Category has been deleted!',
            icon: 'success'
          })
          // this.rerender();
          this.getCategories();
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
      // this.rerender();
      this.getCategories();
      this.formData=new FormData();

    })
  }
  pageChange(page) {
    this.filterBody.skip = page.page - 1;
    this.serialNumber = this.filterBody.skip * this.filterBody.limit;
    this.getCategories();
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.getCategories();
      // this.dtTrigger.next();
    });
  }


}
