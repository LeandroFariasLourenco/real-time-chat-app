import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMessage, IUser } from 'lib';
import { ChatService } from './../../services/chat.service';
import { ChatRestService } from 'src/app/services/rest/chat-rest.service';
import { UserRestService } from 'src/app/services/rest/user-rest.service';
import { combineLatest, finalize } from 'rxjs';
import { ChatSocketService } from 'src/app/services/socket/chat-socket.service';
import { MessageRestService } from 'src/app/services/rest/message-rest.service';
import { MessageSocketService } from 'src/app/services/socket/message-socket.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {
  public isLoading: boolean = true;

  public firstUserId!: string;

  public secondUserId!: string;

  public messages: IMessage[] = [];

  public user!: IUser;

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
  }

  private listenForMessages(): void {
    this.messageSocketService.listenForNewMessages().subscribe((message) => {
      console.log(message);
      this.messages = [...this.messages, message];
    });
  }

  private getPathParam(): void {
    this.activatedRoute.params.subscribe(({
      userOne,
      userTwo,
    }) => {
      this.isLoading = true;
      this.firstUserId = userOne;
      this.secondUserId = userTwo;
      this.listenForMessages();
      this.createChatRoom();
      this.getSelectedUserInfo();
    });
  }

  private createChatRoom(): void {
    this.chatRestService.createRoom({
      firstUserId: this.firstUserId,
      secondUserId: this.secondUserId,
    }).subscribe((chatId) => {
      this.chatSocketService.dispatchNewRoomCreated(chatId);
    });
  }

  private getSelectedUserInfo(): void {
    combineLatest([
      this.messageRestService.getMessagesByChat({
        firstUserId: this.firstUserId,
        secondUserId: this.secondUserId,
      }),
      this.userRestService.getUserById(this.secondUserId)
    ])
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(([messages, user]) => {
        this.messages = messages;
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
        user: this.user,
      },
      firstUserId: this.firstUserId,
      secondUserId: this.secondUserId
    }).subscribe((message) => {
      this.messageSocketService.dispatchNewMessageSent(message);
    });
  }
}
