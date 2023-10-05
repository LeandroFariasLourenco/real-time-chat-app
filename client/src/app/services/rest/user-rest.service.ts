import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IUser } from "lib";
import { Observable } from "rxjs";

@Injectable()
export class UserRestService {
  private url: string = "users";

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public getAllUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`server/${this.url}`);
  }

  public getUserById(userId: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`server/${this.url}/${userId}`);
  }

  public createUser(username: string): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(`server/${this.url}`, { username });
  }
}
