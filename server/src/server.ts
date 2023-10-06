import { createServer } from 'node:http';
import { Server } from 'socket.io';
import express from 'express';
import { setupExpress } from './setup-express';
import { setupDatabase } from './database/database';
import { setupSocket } from './socket/setup-socket';

export const APP = express();
export const SERVER = createServer(APP);
export const IO_SERVER = new Server(SERVER, { cors: { origin: '*' } });

const PORT = 3000;

SERVER.listen(PORT, async () => {
  await setupDatabase();
  await setupExpress();
  await setupSocket();

  console.log(`server running on http://localhost:${PORT}`);  
});
