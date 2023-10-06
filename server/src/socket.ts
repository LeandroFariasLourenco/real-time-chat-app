import chalk from 'chalk';
import { IMessage } from "lib";
import { Socket } from "socket.io";
import { IO_SERVER } from "./server";


export const socket = async () => {
  const namespace = IO_SERVER.of("/socket");
  namespace.on('connection', async (socket: Socket) => {
    // socket.broadcast.emit('');
    console.log(chalk.green("A user has connected"));

    socket.on("Message Created", (messages: IMessage[]) => {
      console.log(messages);
    });

    socket.on("Chat Room Created", async ({ roomId }) => {
      await socket.join(roomId);
      // socket.to(roomId).emit("hello", { crazy: true });
      namespace.to(roomId).emit("hello", { crazy: true });
    });

    socket.on("hello", (obj) => {
      console.log(obj);
      IO_SERVER.emit("hello", obj);
    })

    // const connection = await getDatabaseConnection();

    // const emitUserChange = async () => {
    //   const users = await connection.all(USERS_QUERY.SELECT);
    //   socket.broadcast.emit("New User Connected", users);
    // }

    // socket.on("Create a Chat With a User", async ({ firstUserId, secondUserId }: { firstUserId: string; secondUserId: string }) => {
    //   let roomId: number;
    //   console.log(firstUserId)
    //   console.log(secondUserId)
    //   const chat = await connection.get(CHAT_QUERY.SELECT_WITH_USER, {
    //     '$firstUserId': secondUserId,
    //     '$secondUserId': firstUserId
    //   });

    //   console.log(chat);
    //   if (!chat) {
    //     const { lastID } = await connection.run(CHAT_QUERY.INSERT, {
    //       '$firstUserId': firstUserId,
    //       '$secondUserId': secondUserId,
    //     });

    //     roomId = lastID!;
    //   } else {
    //     roomId = chat.id;
    //   }
      
    //   await socket.join(roomId!.toString());
    // });

    // socket.on("Send Message", async ({ message, firstUserId, secondUserId }: { message: IMessage, firstUserId: number, secondUserId: number }) => {
    //   const chat = await connection.get(CHAT_QUERY.SELECT_WITH_USER, {
    //     '$firstUserId': firstUserId,
    //     '$secondUserId': secondUserId,
    //   });
    //   await connection.run(MESSAGES_QUERY.INSERT, {
    //     '$userId': message.user.id,
    //     '$chatId': chat.id,
    //     '$content': message.content,
    //     '$timestamp': message.timestamp,
    //   });

    //   const messages = (await connection.all(MESSAGES_QUERY.SELECT_WITH_USER)).map((message) => {
    //     return {
    //       id: message.id,
    //       content: message.content,
    //       chatId: chat.id,
    //       timestamp: new Date().toISOString(),
    //       user: {
    //         id: message.userId,
    //         name: message.name,
    //         color: message.color
    //       }
    //     }
    //   });

    //   socket.to(chat.id).emit('New Message Received', messages);
    // });

    // socket.on("Create User", async ({ username }: { username: string }) => {
    //   const { lastID } = await connection.run(USERS_QUERY.INSERT, {
    //     '$color': randomColor(),
    //     '$name': username
    //   });
    //   const createdUser = await connection.get(USERS_QUERY.SELECT_BY_ID, {
    //     '$id': lastID!
    //   });
    //   IO_SERVER.emit("New User Created", createdUser);
    //   emitUserChange();
    // });

    // socket.on("Update User", async (user: IUser) => {
    //   await connection.run(USERS_QUERY.UPDATE, {
    //     '$id': user.id!,
    //     '$name': user.name,
    //     '$color': user.color,
    //   });
    //   const users = await connection.run(USERS_QUERY.SELECT);
    //   socket.broadcast.emit("User update", users);
    //   socket.emit("Current User Updated", user);
    // });

    // socket.on('disconnect', () => {
    //   connection.close();
    //   console.log(chalk.red('user has disconnected'));
    //   IO_SERVER.emit("User Disconnected");
    // });

    // socket.on("Is Typing", (user: IUser | null) => {
    //   // IO_SERVER.to(user?.id).broadcast.emit("Is Typing", user);
    // });

    // socket.on("Change User Color", async ({ userId, color }: { userId: string, color: string }) => {
    //   await connection.run(USERS_QUERY.UPDATE_COLOR, {
    //     '$id': userId,
    //     '$color': color,
    //   });
    //   emitUserChange();
    // });
  });
}