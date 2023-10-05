import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ChatRestService {
  private url = "/chat";

  constructor (
    private readonly httpClient: HttpClient
  ) {}

  createRoom({
    firstUserId,
    secondUserId
  }: { firstUserId: string; secondUserId: string }): Observable<string> {
    return this.httpClient.post<string>(`server/${this.url}`, { firstUserId, secondUserId });
  }
}
