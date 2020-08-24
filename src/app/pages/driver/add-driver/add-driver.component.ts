import { Component, OnInit, ViewChild } from '@angular/core';
import {DriverBody} from "../../../requests/driver-body";
import {ApiService} from "../../../services/api/api.service";
import {CommonService} from "../../../services/common/common.service";
import {Resp} from "../../../models/Resp";
import {Router} from "@angular/router";
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {
  history = window.history;
  body = new DriverBody();
  document1: any;
  document2: any;
  document3: any
  flags = {
    isAdded: false
  };
  formData = new FormData();

  constructor(
    private api: ApiService,
    private common: CommonService,
    private router: Router
  ) { }
  @ViewChild("placesRef", { static: false }) placesRef: GooglePlaceDirective;

  ngOnInit() {
  }
  addDriver() {
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
    this.api.addDriver(this.formData).subscribe((response: Resp) => {
      this.flags.isAdded = false;
      if (!response.success){
        this.formData.delete('firstName')
        this.formData.delete('lastName')
        this.formData.delete('email')
        this.formData.delete('password')
        this.formData.delete('phone')
        this.formData.delete('city')
        this.formData.delete('address')
        this.formData.delete('bio')
        this.formData.delete('documentOne');;
        this.formData.delete('documentTwo');
        this.formData.delete('documentThree');
        return;
      }
      this.common.successToast('Driver added successfully!');
      this.router.navigateByUrl('/dashboard/drivers');
    }, error => {
      this.flags.isAdded = false;
    });
  }
  public handleAddressChange(address) {
    if (address.formatted_address) {
      this.body.address = address.formatted_address
      console.log( address, "addesss")
    }
    address.address_components.forEach(key => {
      if (key.types[0] == 'locality') {
        this.body.city = key.long_name
      }
      
    })

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
