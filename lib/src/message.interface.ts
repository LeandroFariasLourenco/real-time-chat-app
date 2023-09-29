import { IUser } from "./user.interface";

export interface IMessage {
  user: IUser;
  id?: string;
  content: string;
  timestamp: string;
}
