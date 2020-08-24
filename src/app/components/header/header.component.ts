import { Component, OnInit } from '@angular/core';
import {Admin} from "../../models/Admin";
import {LocalStorageService} from "angular-web-storage";
import { CommonService } from 'src/app/services/common/common.service';
import { ApiService } from 'src/app/services/api/api.service';
import { Resp } from 'src/app/models/Resp';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user = new Admin();

  constructor(   private api: ApiService,
    private common: CommonService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    // this.user = this.localStorage.get('Ginie_Admin');
    this.getProfile()
  }
  getProfile() {
    this.api.getProfile().subscribe((response: Resp) => {
      if (!response.success) return;
      this.user = response.data;
    });
  }
}
