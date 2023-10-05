import { HttpClient } from '@angular/common/http';
import { SocketIoClient } from './../clients/socket-io';
import { Injectable, NgZone } from '@angular/core';
import { IMessage, IUser } from 'lib';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { socketEventToObservable } from '../functions/convert-to-observable';

@Injectable()
export class ChatService {
  zone: NgZone;

  constructor(
    private readonly httpClient: HttpClient
  ) {
    this.zone = new NgZone({ enableLongStackTrace: true });
  }

  public sendMessage(message: IMessage, firstUserId: number, secondUserId: number): void {
    this.httpClient.post('server/message', {
      firstUserId,
      secondUserId,
      message,
    });
  }

  public listenForMessages(userId: number): Observable<IMessage[]> {
    return socketEventToObservable<IMessage[]>("New Message Received");
  }

  public onUserConnected(): Observable<IUser[]> {
    return socketEventToObservable<IUser[]>("New User Connected");
  }
  
  public onUserDisconnected(): Observable<IUser> {
    return socketEventToObservable<IUser>("User Disconnected");
  }

  public dispatchUserIsTyping(user: IUser | null): void {
    SocketIoClient.emit("Is Typing", user);
  }

  public createRoom(): void {
    SocketIoClient.emit("Create Room");
  }

  public onUserIsTyping(): Observable<IUser | null> {
    return socketEventToObservable<IUser | null>("Is Typing");
  }

  public getRoomChatHistory(userOne: number, userTwo: number): Observable<{ messages: IMessage[] }> {
    return this.httpClient.get<{ messages: IMessage[] }>(`server/messages`, { params: { userOne, userTwo } });
  }

  public createChatRoom(firstUserId: number, secondUserId: number): void {
    SocketIoClient.emit("Create a Chat With a User", { firstUserId, secondUserId });
  }

  public getMessageHistory(): Observable<{ messages: IMessage[]}> {
    return this.httpClient.get<{ messages: IMessage[] }>('server/messages');
  }
}
