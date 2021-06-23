import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  username = 'username';
  messages: Array<Message> = [];
  message = '';

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;

        const pusher = new Pusher('7e1d288d38eb4c3cfc27', {
          cluster: 'mt1'
        });
    
        const channel = pusher.subscribe('ChatApi');
        channel.bind('message', (data: Message) => {
          this.messages.push(data);
        });
  }

  submit(): void{
    let msg: Message = new Message;
    msg.username = this.username;
    msg.message = this.message;

    this.http.post('http://localhost:8000/api/messages', msg)
      .subscribe(() => this.message = '');
  }
}

class Message{
  username = '';
  message = '';
}