import { Injectable } from "@angular/core";
import { IUser } from "lib";
import { Observable } from "rxjs";
import { SocketIoClient } from "src/app/clients/socket-io";
import { socketEventToObservable } from "src/app/functions/convert-to-observable";

@Injectable({ providedIn: 'root' })
export class UserSocketService {
  constructor() { }

  public dispatchNewUserCreated(user: IUser): void {
    SocketIoClient.emit("User Created", user);
  }

  public dispatchUserDisconnected(user: IUser): void {
    SocketIoClient.emit("User Disconnected", user);
  }

  public listenForUserDisconnect(): Observable<IUser> {
    return socketEventToObservable<IUser>("User Disconnected");
  }

  public listenForNewUser(): Observable<IUser> {
    return socketEventToObservable<IUser>("User Created");
  }
}
