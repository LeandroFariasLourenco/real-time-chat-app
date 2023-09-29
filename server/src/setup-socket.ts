import { IMessage, IUser } from "lib";
import { v4 as uuidv4 } from 'uuid';
import { Socket } from "socket.io";
import { IO_SERVER } from "./server";

export const setupSocket = () => {
  IO_SERVER.on('connection', (socket: Socket) => {
    console.log('a user connected');
    // console.log(users);

    socket.on("User Created", (user: IUser) => {
      user.id = uuidv4();
      // users.push(user);
      // IO_SERVER.emit("Logged User", user);
      // IO_SERVER.emit("User Created", users);
    });

    socket.on("Message Received", (message: IMessage) => {
      // messages.push(message);
      // IO_SERVER.emit("Message Received", messages);
    });

    socket.on("Update User", (user: IUser) => {
      // const userToEditIndex = users.findIndex(({ id }) => user.id === id);
      // users[userToEditIndex].name = user.name;
      // IO_SERVER.emit("Logged User", users[userToEditIndex]);
      // IO_SERVER.emit("Update User", users);
    });

    socket.on("Get Messages", () => {
      // IO_SERVER.emit("Get Messages", messages);
    });

    socket.on('disconnect', () => {
      console.log('user has disconnected');
      IO_SERVER.emit("User Disconnected");
    });

    socket.on("Is Typing", (user: IUser | null) => {
      IO_SERVER.emit("Is Typing", user);
    });
  });
}