import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../../services/api/api.service';
import {CommonService} from '../../../services/common/common.service';
import {Resp} from '../../../models/Resp';
import { Subject } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-commission-modal',
  templateUrl: './commission-modal.component.html',
  styleUrls: ['./commission-modal.component.scss']
})
export class CommissionModalComponent implements OnInit {
  @Input() isEdit: boolean;
  @Input() imageUrl: string;
  @Output() onAddEdit = new EventEmitter();
  src: any;
  file: File;
  formData = new FormData();
  minAmount: any;
  maxAmount:any
  isPlus:boolean=false;
  plus:boolean=false
  flags = {
    isAdded: false,
    isUpdate: false
  };
  commission: any;
  id: any;
 
  constructor(
    private api: ApiService,
    private common: CommonService,
  ) { }

  ngOnInit() {
  }

  onImageRemove() {
    this.src = null;
    $('#categoryFile').val('');
  }
  onEditSelect(data) {
    this.minAmount = data.minAmount;
    this.maxAmount = data.maxAmount;
    if(data.isPlus == true){
      this.plus = true
    }
    this.isPlus   = data.isPlus;
    this.commission = data.commission
    this.isEdit = true;
    this.id= data._id;
    document.getElementById('openCategoryModal').click();
  }
  addCommission() {
    this.flags.isAdded = true;
    let body={
      
        "minAmount":this.minAmount,
        "maxAmount":this.maxAmount,
        "commission": this.commission,
        "isPlus":this.isPlus
    }
    this.api.addCommssion(body).subscribe((response: Resp) => {
      this.flags.isAdded = false;
      if (!response.success) return;
      this.onCancel();
      this.common.successToast('Commission added successfully!');
      this.onAddEdit.emit(true);
    }, error => {
      this.flags.isAdded = false;
    });
  }
  editCommission() {
    this.flags.isUpdate = true;
    let data={
      
      "minAmount":this.minAmount,
      "maxAmount":this.maxAmount,
      "commission": this.commission,
      "isPlus":this.isPlus,
      "id":this.id
  }
    this.api.updateCommission(data).subscribe((response: Resp) => {
      this.flags.isUpdate = false;
      if (!response.success) return;
      this.onCancel();
      this.common.successToast('Commission updated successfully!');
      this.onAddEdit.emit(true);
      
    }, error => {
      this.flags.isUpdate = false;
    });
  }
  onCancel() {
    this.minAmount = '';
    this.maxAmount ='';
    this.commission ='';
    this.isPlus=false;
    this.plus=false
    this.file = null;
    this.src = null;
    $('#categoryFile').val('');
    this.isEdit = false;
    document.getElementById('closeCategoryModal').click();
  }
  error = message => {
    this.common.errorToast(message);
  }
  Active(item){
  console.log(item)
  if(item == true){
    this.maxAmount = 0
    this.plus = true
    }
    else{
      this.plus = false
    }
  }
}
