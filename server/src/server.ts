import { createServer } from 'node:http';
import { Server } from 'socket.io';
import express from 'express';
import { socket } from './socket';
import { setupExpress } from './setup-express';
import { setupDatabase } from './database/database';

export const APP = express();
export const SERVER = createServer(APP);
export const IO_SERVER = new Server(SERVER, { cors: { origin: '*' } });

const PORT = 3000;

setupDatabase();
setupExpress();
socket();

SERVER.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);  
});
