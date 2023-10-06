import { NextFunction, Request, Response } from "express";
import { Users } from "../express/users";
import { Auth } from "../express/auth";

export const auth = (request: Request, response: Response, next: NextFunction) => {
  if (
    (Users.urls.create === request.url && request.method === 'POST') ||
    (Auth.urls.login === request.url && request.method === 'POST')
  ) {
    next();
    return;
  }

  /* @ts-ignore */
  if (request.session.username) {
    next();
    return;
  }
  response.status(403);
  response.send({
    message: "User's not authenticated."
  });
};
