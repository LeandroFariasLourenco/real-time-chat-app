import randomColor from 'randomcolor';
import { USERS_QUERY } from './database/queries/users';
import { getDatabaseConnection } from './database/database';
import { IMessage, IUser } from "lib";
import { Socket } from "socket.io";
import { SocketEvents } from 'lib';
import { IO_SERVER } from "./server";
import { MESSAGES_QUERY } from './database/queries/messages';
import chalk from 'chalk';
import { SESSION_MIDDLEWARE } from './setup-express';


export const socket = () => {
  IO_SERVER.engine.use(SESSION_MIDDLEWARE);
  IO_SERVER.on('connection', async (socket: Socket) => {
    console.log(SocketEvents.MessageReceived);

    const connection = await getDatabaseConnection();
    console.log(chalk.green('a user connected'));
  
    const emitUserChange = async () => {
      const users = await connection.all(USERS_QUERY.SELECT);
      socket.broadcast.emit("New User Connected", users);
    }

    socket.on("Create User", async ({ username }: { username: string }) => {
      const { lastID } = await connection.run(USERS_QUERY.INSERT, {
        '$color': randomColor(),
        '$name': username
      });
      const createdUser = await connection.get(USERS_QUERY.SELECT_BY_ID, {
        '$id': lastID!
      });
      IO_SERVER.emit("New User Created", createdUser);
      emitUserChange();
    });

    socket.on("Create Message", async (message: IMessage) => {
      await connection.run(MESSAGES_QUERY.INSERT, {
        '$userId': message.user.id,
        '$content': message.content,
        '$timestamp': message.timestamp,
      });
      const messages = (await connection.all(MESSAGES_QUERY.SELECT_WITH_USER)).map((message) => {
        return {
          id: message.id,
          content: message.content,
          timestamp: message.timestamp,
          user: {
            id: message.userId,
            name: message.name,
            color: message.color
          }
        }
      });
      //socket.broadcast.emit("New Message Received", messages);
      IO_SERVER.emit("New Message Received", messages);
    });
    
    socket.on("Update User", async (user: IUser) => {
      await connection.run(USERS_QUERY.UPDATE, {
        '$id': user.id!,
        '$name': user.name,
        '$color': user.color,
      });
      const users = await connection.run(USERS_QUERY.SELECT);
      socket.broadcast.emit("User update", users);
      socket.emit("Current User Updated", user);
    });

    socket.on('disconnect', () => {
      connection.close();
      console.log(chalk.red('user has disconnected'));
      IO_SERVER.emit("User Disconnected");
    });

    socket.on("Is Typing", (user: IUser | null) => {
      socket.broadcast.emit("Is Typing", user);
    });

    socket.on("Change User Color", async ({ userId, color }: { userId: string, color: string }) => {
      await connection.run(USERS_QUERY.UPDATE_COLOR, {
        '$id': userId,
        '$color': color,
      });
      emitUserChange();
    });
  });
}