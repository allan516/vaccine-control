import { Component, Input } from '@angular/core';
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
}
