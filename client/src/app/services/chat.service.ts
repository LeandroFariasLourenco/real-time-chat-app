import { HttpClient } from '@angular/common/http';
import { SocketIoClient } from './../clients/socket-io';
import { Injectable, NgZone } from '@angular/core';
import { IMessage, IUser } from 'lib';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { convertToObservable } from '../functions/convert-to-observable';

@Injectable()
export class ChatService {
  zone: NgZone;

  constructor(
    private readonly httpClient: HttpClient
  ) {
    this.zone = new NgZone({ enableLongStackTrace: true });
  }

  public sendMessage(message: IMessage): void {
    SocketIoClient.emit("Message Received", message);
  }

  public listenToMessages(): Observable<IMessage[]> {
    return convertToObservable<IMessage[]>("Message Received");
  }

  public onUserConnected(): Observable<IUser> {
    return convertToObservable<IUser>("User Connected");
  }
  
  public onUserDisconnected(): Observable<IUser> {
    return convertToObservable<IUser>("User Disconnected");
  }

  public dispatchUserIsTyping(user: IUser | null): void {
    SocketIoClient.emit("Is Typing", user);
  }

  public onUserIsTyping(): Observable<IUser | null> {
    return convertToObservable<IUser | null>("Is Typing");
  }

  public getMessageHistory(): Observable<IMessage[]> {
    return this.httpClient.get<IMessage[]>('server/messages');
  }
}
