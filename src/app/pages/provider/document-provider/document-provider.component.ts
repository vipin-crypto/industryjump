import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { Resp } from '../../../models/Resp';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { UrlService } from 'src/app/services/url/url.service';
@Component({
  selector: 'app-document-provider',
  templateUrl: './document-provider.component.html',
  styleUrls: ['./document-provider.component.scss']
})
export class DocumentProviderComponent implements OnInit {
  history = window.history;
  userId: any;
  body: any;
  file;
  formData = new FormData();
  imageUrl: string;
  documentOne: any;
  documentTwo: any;
  documentThree: any
  document1: any
  document4: any
  document2: any;
  document3: any
  documentFour: any;
  documents: any = []
  name: any = [];
  indexValue: any;
  constructor(private api: ApiService,
    private router: Router,
    private common: CommonService,
    private url: UrlService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.imageUrl = this.url.imageUrl + '/';
    this.activatedRoute.params.subscribe((param: any) => {
      this.userId = param.id;
      this.getUserDetail();
    });
  }
  getUserDetail() {
    this.api.getUserDetail(this.userId).subscribe((response: Resp) => {
      if (!response.success) return;
      if (response.success) {
        this.body = response.data;
        if (this.body.document != null && this.body.document.documents.length > 0) {
          this.documents = response.data.document.documents
          this.documents.forEach(element => {
            this.name.push({ 'name': element.name, url: element.url })
            console.log(this.name, "nam")
          });
          console.log(this.documents)
        }
        else {
          this.api.getStaticPages().subscribe(
            (data: any) => {
              if (data.success) {
                this.documents = data.data.documents
                this.documents.forEach(element => {
                  this.name.push({ 'name': element.name, url: "" })
                  console.log(this.name, "nam")
                });
              }
            })
        }
      }
    });
  }
  ondocumenet1Select(e, doc, i) {
    const file = e.target.files[0];
    this.changeImage(file, doc, i);
    this.formData.delete('image');
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      // if (file.type) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.document1 = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      this.file = file;
      this.document1 = file;
    }

  }

  changeImage(file, doc, i) {
    this.indexValue = i
    let formDocument = new FormData();
    formDocument.append('image', file)
    this.api.updateimage(formDocument).subscribe((res) => {
      if (res['success']) {
        this.documents.forEach(element => {
          console.log(doc, element.name, "equal")
          console.log("ataaffff")
          const index = this.name.indexOf(doc.name);
          this.name[this.indexValue].url = res['data'].image;
          this.documentOne = res['data'].image
          console.log(doc, element.name, "equal")
        })
      }
      let data = {
        "id": this.userId, "documents": this.name
      }
      console.log('ata',data);
      this.api.updatedocumentimage(data).subscribe((res) => {
        if (res['success'] == true) {
          this.documents = res['data'].documents
          this.common.successToast('Updated Successfully')
          // this.getUserDetail();
        }

      })
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