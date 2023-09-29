import express from 'express';
import { IMessage, IUser } from "lib";
import { createServer } from 'node:http';
import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

// import chalk from 'chalk';
// import { Server } from 'socket.io';
const app = express();
const server = createServer(app);
const ioServer = new Server(server, { cors: { origin: '*' } });
const port = 3000;

const users: IUser[] = [];
const messages: IMessage[] = [];

ioServer.on('connection', (socket: Socket) => {
  console.log('a user connected');

  socket.on("User Created", (user: IUser) => {
    user.id = uuidv4();
    users.push(user);
    // ioServer.emit("Logged User", user);
    ioServer.emit("User Created", users);
  });

  socket.on("Message Received", (message: IMessage) => {
    messages.push(message);
    ioServer.emit("Message Received", messages);
  });

  socket.on("Update User", (user: IUser) => {
    const userToEditIndex = users.findIndex(({ id }) => user.id === id);
    users[userToEditIndex].name = user.name;
    // ioServer.emit("Logged User", users[userToEditIndex]);
    ioServer.emit("Update User", users);
  });

  socket.on("Get Messages", () => {
    ioServer.emit("Get Messages", messages);
  });

  socket.on('disconnect', () => {
    console.log('user has disconnected');
    ioServer.emit("User Disconnected");
  });

  socket.on("Is Typing", (user: IUser | null) => {
    ioServer.emit("Is Typing", user);
  });
});

app.get('/messages', (request, response) => {
  response.send(messages);
});

app.get('/users', (request, response) => {
  response.send(users);
})

server.listen(port, () => {
  console.log(`running at http://localhost:${port}`);
});
