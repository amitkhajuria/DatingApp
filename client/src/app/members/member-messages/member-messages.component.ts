
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessagesComponent } from 'src/app/messages/messages.component';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input() username: string;
  //messages: Message[];
  @Input() messages: Message[];
  messageContent: string;

  @ViewChild('messageForm')  messageForm :NgForm  //get access of the form
  

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    // this.loadMessages();
  }

  // loadMessages() {
  //   this.messageService.getMessageThread(this.username).subscribe(messages => {
  //     this.messages = messages;
  //   });
  // }

  sendMessage(){
    this.messageService.sendMessage(this.username,this.messageContent).subscribe(message => {
      this.messages.push(message);
      this.messageForm.reset();

    })
  }

  deleteMessage()
  {
    
  }
}
