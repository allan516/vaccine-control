import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-message',
  templateUrl: './messages.component.html',
  standalone: true,
  imports: [MessagesModule],
})
export class MessageComponent {
  @Input()
  messages!: Message[];

  /*
  [{ severity: 'info', detail: 'Info Message' }];
  [{ severity: 'success', detail: 'Sucesso!' }];
  [{ severity: 'warn', detail: 'Warning Message' }];
  [{ severity: 'error', detail: 'Usuário ou senha incorreto!' }];
*/
}
