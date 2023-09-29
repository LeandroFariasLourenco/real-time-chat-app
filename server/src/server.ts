import { createServer } from 'node:http';
import express from 'express';
import { Server } from 'socket.io';
import { setupSocket } from './setup-socket';
import { setupRoutes } from './setup-routes';
import { setupDatabase } from './database/setup-database';

export const APP = express();
export const SERVER = createServer(APP);
export const IO_SERVER = new Server(SERVER, { cors: { origin: '*' } });

const PORT = 3000;

setupDatabase();
setupRoutes();
setupSocket();

SERVER.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);  
});
