import { Component, OnInit, ViewChild } from '@angular/core';
import {AddUserBody} from "../../../requests/add-user-body";
import {ApiService} from "../../../services/api/api.service";
import {UrlService} from "../../../services/url/url.service";
import {CommonService} from "../../../services/common/common.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Resp} from "../../../models/Resp";
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.scss']
})
export class EditProviderComponent implements OnInit {
  history = window.history;
  body = new AddUserBody();
  userId: string;
  config: object;
  countryCodes: any;


  flags = {
    isUpdate: false
  };
  latitude: any;
  longitude: any;

  constructor(
    private api: ApiService,
    private common: CommonService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  @ViewChild("placesRef", { static: false }) placesRef: GooglePlaceDirective;

  ngOnInit() {
    this.activatedRoute.params.subscribe((param: any) => {
      this.userId = param.id;
      this.getUserDetail();
      this.api.getCountryCode().subscribe((res:any) => {
        this.countryCodes = res.countryArray
        console.log(this.countryCodes,res)
          this.config = {
            displayKey: "Code", //if objects array passed which key to be displayed defaults to description
            search: true, //true/false for the search functionlity defaults to false,
            height: "150px", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
            placeholder: "Select Country Code", // text to be displayed when no item is selected defaults to Select,
            customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
            limitTo: this.countryCodes.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
            moreText: "more", // text to be displayed whenmore than one items are selected like Option 1 + 5 more
            noResultsFound: "No results found!", // text to be displayed when no items are found while searching
            searchPlaceholder: "Search", // label thats displayed in search input,
            searchOnKey: "Code" // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
          };
          });
    });
   }
  getUserDetail() {
    this.api.getUserDetail(this.userId).subscribe((response: Resp) => {
      if (!response.success) return;
      this.body = response.data;
      this.latitude=response.data.latitude
      this.longitude=response.data.longitude
     
    });
     }

     public handleAddressChange(addressValue) {
    if (addressValue.formatted_address) {
      this.body.address = addressValue.formatted_address
      console.log( addressValue, "addesss")
    }
    addressValue.address_components.forEach(key => {
      if (key.types[0] == 'locality') {
        this.body.city = key.long_name
      }
      if (key.types[0] === 'administrative_area_level_1') {
        this.body.state = key.long_name
      }
      if (key.types[0] === 'country') {
        this.body.country = key.long_name
      }
      this.latitude = addressValue.geometry.location.lat()
      this.longitude = addressValue.geometry.location.lng()
       })
    
  }
  selectionChanged(event){
    console.log(event)
     if (event.value) {
       this.body.countryCode=event.value.Code
     }
    }
  
  editUser() {
    this.flags.isUpdate = true;
    this.body.latitude=this.latitude
    this.body.longitude=this.longitude
    this.body.id=this.userId
    this.api.editUser(this.body).subscribe((response: Resp) => {
      this.flags.isUpdate = false;
      if (!response.success) return;
      this.common.successToast('Provider updated successfully!');
      this.router.navigateByUrl('/dashboard/provider');
    }, error => {
      this.flags.isUpdate = false;
    });
  }

}
