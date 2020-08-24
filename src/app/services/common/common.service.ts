import { Injectable } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrManager} from 'ng6-toastr-notifications';
import {ApiService} from '../api/api.service';
import {Resp} from '../../models/Resp';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  dropSetting = {
    enableCheckAll: false,
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  singleDropSetting = {
    enableCheckAll: false,
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  constructor(
    private spinner: NgxSpinnerService,
    private toaster: ToastrManager,
    private api: ApiService
  ) { }
  
  showSpinner() {
    this.spinner.show();
  }
  hideSpinner() {
    this.spinner.hide();
  }
  successToast(message) {
    this.toaster.successToastr(message, '', {
      maxShown: 1
    });
  }
  errorToast(message) {
    this.toaster.errorToastr(message);
  }
  getCategories() {
    return new Promise((resolve, reject) => {
      this.api.getCategories().subscribe((response: Resp) => {
        if (!response.success) return;
        return resolve(response);
      });
    });
  }
  getSubCategories(id: string) {
    return new Promise((resolve, reject) => {
      this.api.getSubCatWithoutPagination(id).subscribe((response: Resp) => {
        if (!response.success) return;
        return resolve(response);
      });
    });
  }
  getProductBySubCat(id: string) {
    return new Promise((resolve, reject) => {
      this.api.getSubCatProduct(id).subscribe((response: Resp) => {
        if (!response.success) return;
        return resolve(response);
      });
    });
  }
  async getSubCatDetails(id: string) {
    return new Promise((resolve, reject) => {
      this.api.getSubCatDetails(id).subscribe((response: Resp) => {
        if (!response.success) return;
        return resolve(response.data);
      });
    });
  }
  async getProductDetails(id: string) {
    return new Promise((resolve, reject) => {
      this.api.getProductDetail(id).subscribe((response: Resp) => {
        if (!response.success) return;
        return resolve(response.data);
      });
    });
  }
}
