import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import { Messages } from "./express/messages";
import { Users } from "./express/users";
import { APP } from "./server";
import { Chat } from "./express/chat";
import { Auth } from "./express/auth";
import { session, auth } from "./middlewares";

const jsonParser = bodyParser.json();

export const setupExpress = async () => {
  APP.use(jsonParser);
  APP.use(cookieParser());
  APP.use(session);
  APP.use(auth);

  APP.get(Users.urls.get, Users.get);
  APP.get(Users.urls.getById, Users.getById);
  APP.put(Users.urls.update, Users.update);
  APP.post(Users.urls.create, Users.create);

  
  APP.get(Chat.urls.get, Chat.get);
  APP.post(Chat.urls.create, Chat.create);


  APP.post(Auth.urls.login, Auth.login);
  APP.get(Auth.urls.logout, Auth.logout);
  APP.get(Auth.urls.getCurrentSession, Auth.getCurrentSession);

  
  APP.get(Messages.urls.get, Messages.get);
  APP.post(Messages.urls.create, Messages.create);
}

