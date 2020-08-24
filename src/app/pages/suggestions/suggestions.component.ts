import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, Input, } from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {Resp} from '../../models/Resp';
import {FilterBody} from '../../requests/filter-body';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { CommonService } from 'src/app/services/common/common.service';
@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  @Input() selectedList: Array<any>;
  @Input() imageUrl: string;

  currentPage = 1;
  serialNumber = 0;
  filterBody = new FilterBody();
  SuggestionList: any;
  constructor(
    private api: ApiService,
    private common: CommonService
  ) { }
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  ngOnInit():void {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
    this.getSuggestionList();
  }
  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getSuggestionList();
    });
  }
  getSuggestionList() {
    this.api.getAllSuggestions().subscribe((response: Resp) => {
       if (!response.success) return;
       this.SuggestionList = response.data;
       this.dtTrigger.next();
     });
   }
}
