import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../../services/api/api.service';
import {CommonService} from '../../../services/common/common.service';
import {Resp} from '../../../models/Resp';
import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent implements OnInit {
  @Input() isEdit: boolean;
  @Input() imageUrl: string;
  @Output() onAddEdit = new EventEmitter();
  src: any;
  file: File;
  formData = new FormData();
  categoryName: string;
  flags = {
    isAdded: false,
    isUpdate: false
  };
 
  constructor(
    private api: ApiService,
    private common: CommonService,
  ) { }

  ngOnInit() {
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
  onImageRemove() {
    this.src = null;
    $('#categoryFile').val('');
  }
  onEditSelect(data) {
    this.categoryName = data.name;
    this.isEdit = true;
    this.src = `${this.imageUrl}/${data.image}`;
    this.formData.append('id', data._id);
    document.getElementById('openCategoryModal').click();
  }
  addCategory() {
    if (!this.file) return this.error('Please select image first.');
    this.flags.isAdded = true;
    this.formData.append('name', this.categoryName);
    this.api.addCategory(this.formData).subscribe((response: Resp) => {
      this.flags.isAdded = false;
      if (!response.success) return;
      this.onCancel();
      this.common.successToast('Category added successfully!');
      this.onAddEdit.emit(true);
    }, error => {
      this.flags.isAdded = false;
    });
  }
  editCategory() {
    this.flags.isUpdate = true;
    this.formData.append('name', this.categoryName);
    this.api.updateCategory(this.formData).subscribe((response: Resp) => {
      this.flags.isUpdate = false;
      if (!response.success) return;
      this.onCancel();
      this.common.successToast('Category updated successfully!');
      this.onAddEdit.emit(true);
      
    }, error => {
      this.flags.isUpdate = false;
    });
  }
  onCancel() {
    this.categoryName = '';
    this.file = null;
    this.src = null;
    $('#categoryFile').val('');
    this.formData = new FormData();
    this.isEdit = false;
    document.getElementById('closeCategoryModal').click();
  }
  error = message => {
    this.common.errorToast(message);
  }
  
}
