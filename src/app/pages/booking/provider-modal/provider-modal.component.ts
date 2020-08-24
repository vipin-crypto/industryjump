import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-provider-modal',
  templateUrl: './provider-modal.component.html',
  styleUrls: ['./provider-modal.component.scss']
})
export class ProviderModalComponent implements OnInit {
  @Input() sentTo: any;

  constructor() { }

  ngOnInit() {
  }

}
