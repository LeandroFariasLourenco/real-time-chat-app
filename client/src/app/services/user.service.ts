import { Injectable, NgZone } from "@angular/core";
import { ChatService } from "./chat.service";
import { SocketIoClient } from "../clients/socket-io";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IUser } from "lib";
import { convertToObservable } from "../functions/convert-to-observable";

@Injectable()
export class UserService {
  private storageKey = 'current-user';

  constructor(
    private readonly chatService: ChatService,
    private readonly httpClient: HttpClient,
  ) {
    convertToObservable<IUser>("Logged User").subscribe((createdUser) => {
      localStorage.setItem(this.storageKey, JSON.stringify(createdUser));
      location.reload();
    })
  }
  
  public createUser(user: IUser): void {
    SocketIoClient.emit("User Created", user);
  }

  public getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>('server/users');
  }

  public onUserCreated(): Observable<IUser[]> {
    return convertToObservable<IUser[]>("User Created");
  }

  public updateUser(user: IUser): void {
    SocketIoClient.emit("Update User", user);
  }

  public getCurrentUser(): IUser | null {
    const user = localStorage.getItem(this.storageKey);

    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public logout(): void {
    localStorage.removeItem(this.storageKey);
    location.reload();
  }
}
