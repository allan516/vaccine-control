import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-message',
  templateUrl: './messages.component.html',
  standalone: true,
  imports: [MessagesModule],
})
export class MessageComponent implements OnInit {
  @Input()
  messages!: Message[];

  // success() {
  //   this.messages = [{ severity: 'success', detail: 'Sucesso!' }];
  // }

  // error() {
  //   this.messages = [
  //     { severity: 'error', detail: 'Usuário ou senha incorreto!' },
  //   ];
  // }

  // warn() {
  //   this.messages = [{ severity: 'warn', detail: 'Warning Message' }];
  // }

  // Info() {
  //   this.messages = [{ severity: 'info', detail: 'Info Message' }];
  // }

  ngOnInit(): void {
    this.takeMessage(this.messages);
  }

  takeMessage(msg: Message[]) {}
}
