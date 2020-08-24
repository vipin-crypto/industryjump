import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { UrlService } from 'src/app/services/url/url.service';
import { CommonService } from 'src/app/services/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { Resp } from 'src/app/models/Resp';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  @Input() service: Array<any>;
  history = window.history;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  providerId: any;
  ServicesList: any;
  serialNumber = 0;
  imageUrl: string;
  constructor( private api: ApiService,
    private url: UrlService,
    private common: CommonService,
    private activatedRoute: ActivatedRoute) { }
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
    this.providerId = params.id;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.imageUrl=this.url.imageUrl

    this.getServices();
  })
}
  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  getServices(){
      this.api.getProviderServices(this.providerId).subscribe((response: Resp) => {
        if (!response.success) return;
        this.ServicesList = response.data;
        this.dtTrigger.next();
      });
    }
    selectedServiceList(item){
      this.service=item
    }
}
