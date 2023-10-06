import { IUser } from "./user.interface";

export interface IMessage {
  user: IUser;
  id?: string;
  chatId?: string;
  content: string;
  timestamp: string;
}
