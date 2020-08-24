import { Component, OnInit, ViewChild } from '@angular/core';
import {AddUserBody} from '../../../requests/add-user-body';
import {ApiService} from '../../../services/api/api.service';
import {CommonService} from '../../../services/common/common.service';
import {Resp} from "../../../models/Resp";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  history = window.history;
  body = new AddUserBody();
  document1: any;
  document2: any;
  document3: any
  formData = new FormData();

  flags = {
    isAdded: false
  };

  constructor(
    private api: ApiService,
    private common: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  addUser() {
    if (!this.document1 || !this.document2 || !this.document3) 
    return this.common.errorToast('Please select Document first.');
    this.flags.isAdded = true;
    for (let key in this.body) {
      this.formData.append(`${key}`, this.body[key]);
      console.log(this.formData, `${key}`)
    }
    if (this.document1) this.formData.append('documentOne', this.document1)
    if (this.document2) this.formData.append('documentTwo', this.document2)
    if (this.document3) this.formData.append('documentThree', this.document3)
    this.flags.isAdded = true;
    this.api.addProvider(this.formData).subscribe((response: Resp) => {
      this.flags.isAdded = false;
      if (!response.success){
      this.formData.delete('brnNumber')
    this.formData.delete('accountNumber')
    this.formData.delete('accountHolderName')
    this.formData.delete('bankName')
    this.formData.delete('vatNumber')
    this.formData.delete('company')
    this.formData.delete('firstName')
    this.formData.delete('lastName')
    this.formData.delete('email')
    this.formData.delete('userName')
    this.formData.delete('phone')
    this.formData.delete('country')
    this.formData.delete('state')
    this.formData.delete('city')
    this.formData.delete('address')
    this.formData.delete('documentOne')
    this.formData.delete('documentTwo')
    this.formData.delete('documentThree')
    this.formData.delete('password')
    this.formData.delete('role')
  
      return;
    }
      this.common.successToast('Seller added successfully!');
      this.router.navigateByUrl('/dashboard/users');
    }, error => {
      this.flags.isAdded = false;
    });
  }

  ondocumenet1Select(e) {
    const file = e.target.files[0];
    this.formData.delete('image');
    if (file.type) {
      this.document1 = file;
    }
 }
  ondocumenet2Select(e) {
    const file = e.target.files[0];
    this.formData.delete('image');
    if (file.type) {
      this.document2 = file;
    }

  }
  ondocumenet3Select(e) {
    const file = e.target.files[0];
    this.formData.delete('image');
    if (file.type) {
     this.document3 = file;
    }

  }
}
