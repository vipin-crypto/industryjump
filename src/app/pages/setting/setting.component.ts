import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {CommonService} from '../../services/common/common.service';
import {Resp} from '../../models/Resp';
import {AddHomeDataSettingBody} from '../../requests/add-home-data-setting-body';
import * as _ from 'lodash';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  setting: any;
  addHomeDataBody = new AddHomeDataSettingBody();
  appHomeList: Array<any> = [];
  flags = {
    isUpdate: false
  };
  role: any;
  access: any;

  constructor(
    private api: ApiService,
    private common: CommonService
  ) { }

  ngOnInit() {
    if (JSON.stringify(localStorage.getItem('Rupee_Admin'))) {
      this.role = JSON.parse(localStorage.getItem('Rupee_Admin'))._value.role
      this.access = JSON.parse(localStorage.getItem('Rupee_Admin'))._value.access
    }
    this.getSettings();
  }
  addHomeData() {
    if (_.findIndex(this.appHomeList, {serialNumber: Number(this.addHomeDataBody.serialNumber)}) > -1) {
      return this.error('Serial number already exists.');
    }
    this.appHomeList.push(this.addHomeDataBody);
    this.appHomeList = _.sortBy(this.appHomeList, 'serialNumber');
    this.addHomeDataBody = new AddHomeDataSettingBody();
  }
  getSettings() {
    this.api.getSetting().subscribe((response: Resp) => {
      if (!response.success) return;
      this.setting = response.data;
      this.appHomeList = response.data ? response.data.appHome : [];
    });
  }
  editSetting() {
    this.flags.isUpdate = true;
    this.api.editSetting({id: this.setting._id, appHome: this.appHomeList}).subscribe((response: Resp) => {
      this.flags.isUpdate = false;
      if (!response.success) return;
      this.common.successToast('Settings updated successfully!');
      this.getSettings();
    }, error => {
      this.flags.isUpdate = false;
    });
  }
  onChangeStatus(index: number, item: any) {
    this.appHomeList[index] = item;
    console.log(this.appHomeList);
  }
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.appHomeList, event.previousIndex, event.currentIndex);
    const current = this.appHomeList[event.currentIndex].serialNumber;
    const previous = this.appHomeList[event.previousIndex].serialNumber;
    this.appHomeList[event.previousIndex].serialNumber = current;
    this.appHomeList[event.currentIndex].serialNumber = previous;
  }
  error = message => {
    this.common.errorToast(message);
  }

}
