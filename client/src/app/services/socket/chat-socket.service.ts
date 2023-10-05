import { Injectable } from "@angular/core";
import { SocketIoClient } from "src/app/clients/socket-io";

@Injectable({ providedIn: 'root' })
export class ChatSocketService {
  public dispatchNewRoomCreated(chatId: string): void {
    SocketIoClient.emit("New Room Created", chatId);
  }
}
