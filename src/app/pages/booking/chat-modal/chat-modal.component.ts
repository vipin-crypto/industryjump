import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss']
})
export class ChatModalComponent implements OnInit {
  @Input() chatList: Array<any>;
  @Input() id:any

  constructor() { }

  ngOnInit() {
    console.log("=======================",this.chatList,this.id)
  }

}
