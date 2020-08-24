import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { UrlService } from 'src/app/services/url/url.service';
import { CommonService } from 'src/app/services/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { FilterBody } from 'src/app/requests/filter-body';
import { Resp } from 'src/app/models/Resp';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-rating-review',
  templateUrl: './rating-review.component.html',
  styleUrls: ['./rating-review.component.scss']
})
export class RatingReviewComponent implements OnInit {
  @Input() isEdit: boolean;

  history = window.history;
  @Output() onAddEdit = new EventEmitter();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  serialNumber = 0;
  ratingData:any
  filterBody = new FilterBody();
  productList: Array<any> = [];
  providerId: any;
  imageUrl: string;
  flags = {
    isUpdate: false
  };
  Userreview: any;
  Userrating: any;
  id: any;
  ratings: any;
  reviews: any;
  constructor(
    private api: ApiService,
    private url: UrlService,
    private common: CommonService,
    private activatedRoute: ActivatedRoute

  ) {}
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.providerId = params.id;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
      this.getReview();
    })
  }
    ngOnDestroy() {
      this.dtTrigger.unsubscribe();
    }
  
  getReview() {
    let body ={
      role:'SP',
      id: this.providerId
    }
    this.api.getProviderReview(body).subscribe((response: Resp) => {
      if (!response.success) return;
      this.productList = response.data;
      this.dtTrigger.next();
    });
  }
  deleteReview(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Provider Review/Rating!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.api.deleteProviderReview(id).subscribe((response: Resp) => {
          if (!response.success) return;
          Swal.fire({
            title: 'Deleted!',
            text: 'Poof! Your Provider Review/Rating has been deleted!',
            icon: 'success'
          })
          this.rerender();
        })
      }
    })
  }
  validate(event){
    console.log(event,"---------------")
    if(event>5)
     return this.common.errorToast('Enter a valid rating upto 5!');
  }
  UpdateStatus(item){
    let data={
      'isFavourite':item.isFavourite,  
    }
    this.api.updateProviderReview(item._id,data).subscribe((response: Resp) => {
      this.flags.isUpdate = false;
      if (!response.success) return;
      this.onCancel();
      this.common.successToast('Status updated successfully!');
      this.onAddEdit.emit(true);
      
    }, error => {
      this.flags.isUpdate = false;
    });
  }
  update(){
    this.Userrating=this.ratings,
    this.Userreview=this.reviews
    console.log(this.Userrating,this.Userreview)
     if(this.Userrating>5)
     return this.common.errorToast('Enter a valid rating!');
     this.flags.isUpdate = true;
   let data={
      'rating':this.Userrating,
      'review':this.Userreview
    }
    this.api.updateProviderReview(this.id,data).subscribe((response: Resp) => {
      this.flags.isUpdate = false;
      if (!response.success) return;
      this.onCancel();
      this.common.successToast('Review/Rating  updated successfully!');
      this.onAddEdit.emit(true);
      
    }, error => {
      this.flags.isUpdate = false;
    });
  }
  
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getReview();
    });
  }
  onEditSelect(item){
    console.log(item)
    this.ratingData=item
    this.reviews=item.review
    this.ratings=item.rating
    this.id=item._id
    this.isEdit = true;
  } 
    
  onCancel() {
    this.Userreview ='';
    this.Userrating = '';
    this.isEdit = false;
    document.getElementById('closeCategoryModal').click();
  }
  error = message => {
    this.common.errorToast(message);
  }
}