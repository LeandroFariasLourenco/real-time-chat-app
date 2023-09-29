import { DialogService } from 'primeng/dynamicdialog';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { IUser } from "lib";
import { Observable } from "rxjs";
import { SocketIoClient } from "../clients/socket-io";
import { convertToObservable } from "../functions/convert-to-observable";
import { ChatService } from "./chat.service";

@Injectable()
export class UserService {
  private storageKey = 'current-user';

  constructor(
    private readonly chatService: ChatService,
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly dialogService: DialogService
  ) { }
  
  public createUser(username: string): void {
    SocketIoClient.emit("Create User", { username });
    convertToObservable("New User Created").subscribe((createdUser) => {
      this.dialogService.dialogComponentRefMap.forEach((dialog) => dialog.destroy()),
      localStorage.setItem(this.storageKey, JSON.stringify(createdUser));
      this.router.navigate(['/home-page']);
    });
  }

  public getUsers(): Observable<{ users: IUser[] }> {
    return this.httpClient.get<{ users: IUser[] }>('server/users');
  }

  public updateUser(user: IUser): void {
    SocketIoClient.emit("Update User", user);
    convertToObservable("Current User Updated").subscribe(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
      location.reload();
    });
  }

  public updateUserColor(userId: string, color: string): void {
    SocketIoClient.emit("Change User Color", { userId, color });
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
