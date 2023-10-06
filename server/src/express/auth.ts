import { Request, Response } from "express";
import { getDatabaseConnection } from "../database/database";
import { handleServerError } from "../utils/handle-error";
import { USERS_QUERY } from "../database/queries/users";
import chalk from "chalk";

export abstract class Auth {
  public static urls = {
    login: '/login',
    logout: '/logout',
    getCurrentSession: '/session'
  }

  public static async login(request: Request, response: Response): Promise<void> {
    const connection = await getDatabaseConnection();
    try {
      const { username } = request.body;
      const user = await connection.get(USERS_QUERY.SELECT_BY_USERNAME, { '$name': request.body.username });

      if (!user) {
        response.status(404);
        response.send({
          message: `No user ${username} was found.`
        });
        return;
      }

      /* @ts-ignore */
      request.session.username = username;
      response.status(200);
      response.send({
        user,
        message: `Session created for user ${user.id}.`
      });
    } catch (e) {
      handleServerError(response);
    } finally {
      connection.close();
    }
  }

  public static async getCurrentSession(request: Request, response: Response): Promise<void> {
    const connection = await getDatabaseConnection();
    try {
      /* @ts-ignore */
      const { username } = request.session;
      const user = await connection.get(USERS_QUERY.SELECT_BY_USERNAME, { '$name': username });

      response.status(200);
      response.send(user);
    } catch (e) {
      response.status(404);
      response.send({
        message: "No user session was found"
      });
    } finally {
      connection.close();
    }
  }

  public static async logout(request: Request, response: Response): Promise<void> {
    request.session.destroy((err) => console.log(chalk.red(err)));
    response.status(200);
    response.send({
      message: "Session ended"
    });
  }
}
