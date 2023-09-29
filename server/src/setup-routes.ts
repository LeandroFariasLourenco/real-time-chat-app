import { IMessage, IUser } from "lib";
import { getDatabaseConnection } from "./database/database";
import { MESSAGES_QUERY } from "./database/queries/messages";
import { USERS_QUERY } from "./database/queries/users";
import { APP } from "./server";

export const setupRoutes = () => {
  APP.get('/messages', async (request, response) => {
    const connection = await getDatabaseConnection();
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
    response.send({ messages });
  });
  
  APP.get('/users', async (request, response) => {
    const connection = await getDatabaseConnection();
    const users = await connection.all<IUser[]>(USERS_QUERY.SELECT);
    response.send({ users });
  });
}

