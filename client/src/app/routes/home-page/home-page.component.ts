import { Component, OnInit } from '@angular/core';
import { IMessage, IUser } from 'lib';
import { Message, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { UserFormComponent } from 'src/app/components/user-form/user-form.component';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public user: IUser | null = null;

  public notifications: Message[] = [];

  constructor(
    private readonly chatService: ChatService,
    private readonly messageService: MessageService
  ) { }

  public ngOnInit(): void {
    this.listenUserConnections();
  }

  public listenUserConnections(): void {
    this.chatService.onUserConnected().subscribe((users) => {
      this.messageService.add({
        severity: 'warn',
        summary: 'Usuário conectado',
        detail: `${users.at(-1)!.name} entrou na sessão.`
      });
    });
  }
}
