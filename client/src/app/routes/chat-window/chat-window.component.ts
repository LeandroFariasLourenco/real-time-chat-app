import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMessage, IUser } from 'lib';
import { ChatService } from './../../services/chat.service';
import { ChatRestService } from 'src/app/services/rest/chat-rest.service';
import { UserRestService } from 'src/app/services/rest/user-rest.service';
import { Subscription, combineLatest, finalize } from 'rxjs';
import { ChatSocketService } from 'src/app/services/socket/chat-socket.service';
import { MessageRestService } from 'src/app/services/rest/message-rest.service';
import { MessageSocketService } from 'src/app/services/socket/message-socket.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {
  public isLoadingUser: boolean = true;

  public firstUserId!: string;

  public secondUserId!: string;

  public messages: IMessage[] = [];

  public user: IUser | null = null;

  private subscriptions$: Subscription = new Subscription();

  constructor(
    private readonly chatRestService: ChatRestService,
    private readonly chatSocketService: ChatSocketService,
    private readonly messageRestService: MessageRestService,
    private readonly messageSocketService: MessageSocketService,
    private readonly userRestService: UserRestService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.getPathParam();
    this.listenForMessages();
  }

  private listenForMessages(): void {
      this.messageSocketService.listenForNewMessages().subscribe((messages) => {
        this.messages = messages;
      })
  }

  private getPathParam(): void {
    this.activatedRoute.params.subscribe(({
      userOne,
      userTwo,
    }) => {
      this.messages = [];
      this.isLoadingUser = true;
      this.user = null;
      this.firstUserId = userOne;
      this.secondUserId = userTwo;
      this.createChatRoom();
      this.getSelectedUserInfo();
    });
  }

  private createChatRoom(): void {
    this.chatRestService.createRoom({
      firstUserId: this.firstUserId,
      secondUserId: this.secondUserId,
    }).subscribe(({ chatId }) => {
      this.chatSocketService.dispatchNewRoomCreated(chatId);

      this.messageRestService.getMessagesByChat({
        firstUserId: this.firstUserId,
        secondUserId: this.secondUserId,
      }).subscribe((messages) => {
        this.messages = messages;
      });
    });
  }

  private getSelectedUserInfo(): void {
    this.userRestService.getUserById(this.secondUserId)
      .subscribe((user) => {
        this.isLoadingUser = false;
        this.user = user;
      });
  }

  public sendMessage({ content, timestamp }: {
    timestamp: string,
    content: string,
  }): void {
    this.messageRestService.sendMessage({
      message: {
        content,
        timestamp,
        user: this.user!,
      },
      firstUserId: this.firstUserId,
      secondUserId: this.secondUserId
    }).subscribe((message) => {
      this.messageSocketService.dispatchNewMessageSent(message);
    });
  }
}
