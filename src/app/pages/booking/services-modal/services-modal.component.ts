import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-services-modal',
  templateUrl: './services-modal.component.html',
  styleUrls: ['./services-modal.component.scss']
})
export class ServicesModalComponent implements OnInit {
  @Input() services: Array<any>;

  constructor() { }

  ngOnInit() {
    console.log(this.services,"selectedList")
  }

}
