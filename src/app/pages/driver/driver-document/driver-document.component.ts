import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { Resp } from 'src/app/models/Resp';

@Component({
  selector: 'app-driver-document',
  templateUrl: './driver-document.component.html',
  styleUrls: ['./driver-document.component.scss']
})
export class DriverDocumentComponent implements OnInit {
  history = window.history;
  driverId: any;
  body: any;
  document1: any
  file;

  formData = new FormData();
  imageUrl: string;
  documentOne: any;
  documentTwo: any;
  documentThree: any
  document2: any;
  document3: any
  id: any;
  role: any;
  access: any;
  constructor(private api: ApiService,
    private router: Router,
    private common: CommonService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.imageUrl = 'http://13.232.208.65:3000/';
    this.activatedRoute.params.subscribe((param: any) => {
      this.driverId = param.id;
      if (JSON.stringify(localStorage.getItem('Rupee_Admin'))) {
        this.role = JSON.parse(localStorage.getItem('Rupee_Admin'))._value.role
        this.access = JSON.parse(localStorage.getItem('Rupee_Admin'))._value.access
      }
      this.getDriverDetail();
    });
  }
  getDriverDetail() {
    this.api.getDriverDetails(this.driverId).subscribe((response: Resp) => {
      if (!response.success) return;
      this.body = response.data;
      this.id=response.data.documents._id
      this.documentOne = response.data.documents.documentOne
      this.documentTwo = response.data.documents.documentTwo
      this.documentThree = response.data.documents.documentThree
    });
  }
  ondocumenet1Select(e, doc) {
    const file = e.target.files[0];
    this.changeImage(file, doc);
    this.formData.delete('image');
    // if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
    if (file.type) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.document1 = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      this.file = file;
      this.document1 = file;
    }

  }
  ondocumenet2Select(e, doc) {
    const file = e.target.files[0];
    this.changeImage(file, doc);
    this.formData.delete('image');
    // if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
    if (file.type) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.documentTwo = event.target.result;
        // this.baseUrl=''
      };
      reader.readAsDataURL(e.target.files[0]);
      this.file = file;

    }

  }
  ondocumenet3Select(e, doc) {
    const file = e.target.files[0];
    this.changeImage(file, doc);
    this.formData.delete('image');
    // if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
    if (file.type) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.document3 = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      this.formData.append('documentThree', this.file);
      this.document3 = file;
    }

  }
  changeImage(file, doc) {
    var docName;
    switch (doc) {
      case 'documentOne':
        docName = 'documentOne'
        break
      case 'documentTwo':
        docName = 'documentTwo'
        break
      case 'documentThree':
        docName = 'documentThree'
        break
    }
    let formDocuments = new FormData()
    formDocuments.append(docName, file)
    formDocuments.append('id', this.id)
    console.log(docName, file)
    this.api.updateDriverDocument(formDocuments).subscribe((res) => {
       if (res['success'] == 1) {

         this.getDriverDetail();
       }

     })
  }
  toDataURL(url) {
    return fetch(url).then((response) => {
      return response.blob();
    }).then(blob => {
      return URL.createObjectURL(blob);
    });
  }
  async forceDownload(baseUrl, name) {
    console.log(name)
    const a = document.createElement("a");
    a.href = await this.toDataURL(baseUrl + name);
    console.log("document", a.href)
    a.download = name.split('/').pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}