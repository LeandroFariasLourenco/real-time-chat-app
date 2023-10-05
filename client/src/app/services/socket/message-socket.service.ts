import { Injectable } from "@angular/core";
import { IMessage } from "lib";
import { Observable } from "rxjs";
import { SocketIoClient } from "src/app/clients/socket-io";
import { socketEventToObservable } from "src/app/functions/convert-to-observable";

@Injectable({ providedIn: 'root' })
export class MessageSocketService {
  constructor() { }

  public dispatchNewMessageSent(message: IMessage): void {
    SocketIoClient.emit("New Message Received", message);
  }

  public listenForNewMessages(): Observable<IMessage> {
    return socketEventToObservable<IMessage>("New Message Received");
  }
}