import { IUser } from "lib";
import session from 'express-session';
import { getDatabaseConnection } from "./database/database";
import { MESSAGES_QUERY } from "./database/queries/messages";
import { USERS_QUERY } from "./database/queries/users";
import { APP } from "./server";
import bodyParser from "body-parser";

export const SESSION_MIDDLEWARE = session({
  cookie: { maxAge: 6000000 },
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
});

const jsonParser = bodyParser.json();

export const setupExpress = () => {
  APP.use(jsonParser);
  APP.use(SESSION_MIDDLEWARE);

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

  APP.post('/login', async (request, response) => {
    const sessionData = request.session;
    console.log(request.body);
    const { username, password } = request.body;

    (request.session as any).username = username;
    (request.session as any).isLoggedIn = true;

    return {
      statusCode: 200,
    };
  });

  APP.get('get-sessions', async (request) => {
    console.log(request.session);

    return request.session;
  });

  APP.post('/logout', async (request, response) => {
    request.session.destroy(() => {});

    return {
      statusCode: 200,
    }
  });
}

