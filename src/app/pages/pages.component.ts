import { Component, OnInit } from '@angular/core';
import * as js from '../../assets/js/custom';
declare var System: any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    js.bgScript();
    js.customScript();
    js.toggleSwitch();
  }

}
