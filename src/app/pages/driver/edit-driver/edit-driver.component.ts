import { Component, OnInit, ViewChild } from '@angular/core';
import {DriverBody} from "../../../requests/driver-body";
import {ApiService} from "../../../services/api/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonService} from "../../../services/common/common.service";
import {Resp} from "../../../models/Resp";
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.scss']
})
export class EditDriverComponent implements OnInit {
  history = window.history;
  body = new DriverBody();
  driverId: string;
  flags = {
    isUpdate: false
  };
    formData = new FormData();

  constructor(
    private api: ApiService,
    private router: Router,
    private common: CommonService,
    private activatedRoute: ActivatedRoute
  ) { }
  @ViewChild("placesRef", { static: false }) placesRef: GooglePlaceDirective;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.driverId = params.id;
      this.getDriverDetails();
    });
  }
  getDriverDetails() {
    this.api.getDriverDetails(this.driverId).subscribe((response: Resp) => {
      if (!response.success) return;
      this.body = response.data;
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
  editDriver() {
    this.flags.isUpdate = true;
    this.body.id = this.driverId;
    this.api.editDriver(this.body).subscribe((response: Resp) => {
      this.flags.isUpdate = false;
      if (!response.success) return;
      this.common.successToast('Driver updated successfully!');
      this.router.navigateByUrl('/dashboard/drivers');
    }, error => {
      this.flags.isUpdate = false;
    });
  }

}
