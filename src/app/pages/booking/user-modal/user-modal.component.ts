import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
 @Input() sentBy : any;


  constructor() { }

  ngOnInit() {
  }

}
