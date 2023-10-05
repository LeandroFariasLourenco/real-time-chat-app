import { io } from "socket.io-client";

export const SocketIoClient = io('http://localhost:3000/socket')