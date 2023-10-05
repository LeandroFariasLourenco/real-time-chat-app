import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUser } from "lib";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
  private urls = {
    login: 'login',
    logout: 'logout',
    session: 'session',
  };

  constructor (
    private readonly httpClient: HttpClient
  ) { }

  public login(username: string): Observable<{ user: IUser, message: string }> {
    return this.httpClient.post<{ user: IUser, message: string }>(`server/${this.urls.login}`, { username });
  }

  public getCurrentSession(): Observable<IUser> {
    return this.httpClient.get<IUser>(`server/${this.urls.session}`);
  }

  public logout(): Observable<{ message: string }> {
    return this.httpClient.get<{ message: string }>(`server/${this.urls.logout}`);
  }
}
