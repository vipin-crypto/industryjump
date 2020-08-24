import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../../services/api/api.service';
import {CommonService} from '../../../services/common/common.service';
import {Resp} from '../../../models/Resp';
import { Categories } from 'src/app/models/categories';
declare var $: any;

@Component({
  selector: 'app-service-modal',
  templateUrl: './service-modal.component.html',
  styleUrls: ['./service-modal.component.scss']
})
export class ServiceModalComponent implements OnInit {
  @Input() imageUrl: string;
  @Output() onAddEdit = new EventEmitter();
  @Input() categoryList: Array<Categories>;

  file: File;
  src: any;
  serviceName: string;
  category:string
  formData = new FormData();
  flags = {
    isAdded: false,
    isUpdate: false,
    isEdit: false
  };

  constructor(
    private api: ApiService,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.category = '';
    this.getCategories()
    console.log(this.categoryList)
  }
  onEditSelect(data) {
    this.flags.isEdit = true;
    this.serviceName = data.name;
    this.category=data.category._id
    this.src = `${this.imageUrl}/${data.image}`;
    this.formData.append('id', data._id);
    document.getElementById('openBrandModal').click();
  }
  getCategories() {
    this.api.getCategories().subscribe((response: Resp) => {
      if (!response.success) return;
      this.categoryList = response.data;
    });
  }
  onImageSelect(e) {
    const file = e.target.files[0];
    this.formData.delete('image');
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.src = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      this.file = file;
      this.formData.append('image', this.file);
    } else {
      this.error('Selected file is not image.');
    }
  }
  addService() {
    if (!this.file) return this.error('Please select image first.');
    this.flags.isAdded = true;
    this.formData.append('name', this.serviceName);
    this.formData.append('category', this.category);
     this.api.addService(this.formData).subscribe((response: Resp) => {
      this.flags.isAdded = false;
      if (!response.success) return;
      this.common.successToast('Service added successfully!');
      this.onAddEdit.emit();
      this.onCancel();
    }, error => {
      this.flags.isAdded = false;
    });
  }
  editService() {
    this.flags.isUpdate = true;
    this.formData.append('name', this.serviceName);
    this.formData.append('category', this.category);
    this.api.editService(this.formData).subscribe((response: any) => {
      this.flags.isUpdate = false;
      if (!response.success) return;
      this.common.successToast('Service updated successfully!');
      this.onAddEdit.emit();
      this.onCancel();
    }, error => {
      this.flags.isUpdate = false;
    });
  }
  onImageRemove() {
    this.src = null;
    $('#brandImage').val('');
  }
  onCancel() {
    this.serviceName = '';
    this.category = '';
    this.flags.isEdit = false;
    $('#brandImage').val('');
    this.file = null;
    this.src = null;
    this.formData = new FormData();
    document.getElementById('closeServiceModal').click();
  }
  error = message => {
    this.common.errorToast(message);
  }

}
