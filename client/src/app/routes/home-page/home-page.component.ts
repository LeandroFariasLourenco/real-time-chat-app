import { Component, OnInit } from '@angular/core';
import { IMessage, IUser } from 'lib';
import { Message, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { UserFormComponent } from 'src/app/components/user-form/user-form.component';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserRestService } from 'src/app/services/rest/user-rest.service';
import { UserSocketService } from 'src/app/services/socket/user-socket.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public user!: IUser;

  public users: IUser[] = []

  public notifications: Message[] = [];

  constructor(
    private readonly userRestService: UserRestService,
    private readonly userSocketService: UserSocketService,
    private readonly authService: AuthService,
    private readonly messageService: MessageService
  ) { }

  public ngOnInit(): void {
    this.listenUserConnections();
    this.getAuthenticatedUser();
    this.getAllUsers();
  }

  private getAllUsers(): void {
    this.userRestService.getAllUsers().subscribe((users) => {
      this.users = [...users];
      this.users.reverse();
    });
  }

  private getAuthenticatedUser(): void {
    this.authService.getCurrentSession().subscribe((user) => {
      this.user = user;
    });
  }

  private listenUserConnections(): void {
    this.userSocketService.listenForNewUsers().subscribe((users) => {
      this.messageService.add({
        severity: 'warn',
        summary: 'Usuário conectado',
        detail: `${users.at(-1)!.name} entrou na sessão.`,
        key: 'notification'
      });
      this.users = users;
    });

    this.userSocketService.listenForUserDisconnect().subscribe((user) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Usuário desconectado',
        detail: `${user.name} saiu da sessão.`,
        key: 'notification'
      });
    });
  }
}
