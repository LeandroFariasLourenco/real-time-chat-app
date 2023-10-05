import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IMessage } from "lib";
import { Observable } from "rxjs";

@Injectable()
export class MessageRestService {
  private url: string = "messages"

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public getMessagesByChat({ firstUserId, secondUserId }: { firstUserId: string, secondUserId: string; }): Observable<IMessage[]> {
    return this.httpClient.get<IMessage[]>(`server/${this.url}`, { params: { firstUserId, secondUserId } });
  }

  public sendMessage({
    firstUserId,
    secondUserId,
    message
  }: { firstUserId: string; secondUserId: string; message: IMessage }): Observable<IMessage> {
    return this.httpClient.post<IMessage>(`server/${this.url}`, {
      firstUserId,
      secondUserId,
      message
    });
  }
}