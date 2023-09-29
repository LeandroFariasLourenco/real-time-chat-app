import { APP } from "./server";

export const setupRoutes = () => {
  APP.get('/messages', (request, response) => {
    // response.send(messages);
  });
  
  APP.get('/users', (request, response) => {
    // response.send(users);
  });
}

