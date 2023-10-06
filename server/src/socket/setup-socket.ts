import { IMessage, IUser } from "lib";
import { Socket } from "socket.io";
import { getDatabaseConnection } from "../database/database";
import { MESSAGES_QUERY } from "../database/queries/messages";
import { USERS_QUERY } from "../database/queries/users";
import { IO_SERVER } from "../server";

export const setupSocket = async () => {
  const namespace = IO_SERVER.of('/socket');

  namespace.on('connection', async (socket: Socket) => {
    socket.on("User Created", async () => {
      const connection = await getDatabaseConnection();
      const users = await connection.all(USERS_QUERY.SELECT);

      socket.broadcast.emit("User Created", users);
      connection.close();
    });

    socket.on("User Disconnected", async (user: IUser) => {
      socket.broadcast.emit("User Disconnected", user);
    });

    socket.on("New Room Created", async (chatId: string) => {
      await socket.join(chatId);
      console.log(chatId)
    });

    socket.on("New Message Received", async (message: IMessage) => {
      const connection = await getDatabaseConnection();
      const messages = (await connection.all(MESSAGES_QUERY.SELECT_PRIVATE, {
        '$chatId': message.chatId!
      })).map((message) => {
        return {
          id: message.id,
          content: message.content,
          chatId: message.chatId,
          timestamp: new Date().toISOString(),
          user: {
            id: message.userId,
            name: message.name,
            color: message.color
          }
        }
      });

      await socket.join(message.chatId!);
      namespace.to(message.chatId!).emit("Incoming New Message", messages);
    });
  });
}