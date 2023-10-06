import { Request, Response } from "express";
import { IUser } from "lib";
import randomColor from "randomcolor";
import { getDatabaseConnection } from "../database/database";
import { USERS_QUERY } from "../database/queries/users";
import { handleServerError } from "../utils/handle-error";
import { IO_SERVER } from "../server";

export abstract class Users {
  public static urls = {
    get: '/users',
    getById: '/users/:id',
    create: '/users',
    update: '/users/:id'
  }

  public static async get(request: Request, response: Response<any, Record<string, any>>) {
    const connection = await getDatabaseConnection();
    try {
      const users = await connection.all<IUser[]>(USERS_QUERY.SELECT);
      response.status(200);
      response.send(users);
    } catch (e) {
      handleServerError(response);
    } finally {
      connection.close();
    }
  };

  public static async create(request: Request, response: Response): Promise<void> {
    const connection = await getDatabaseConnection();

    try {
      const { username } = request.body;

      const hasDuplicate = await connection.get(USERS_QUERY.SELECT_BY_USERNAME, { '$name': username }).then((result) => !!result);
      if (hasDuplicate) {
        response.status(409);
        response.send({
          message: `A username ${username} already exists.`
        });
        return;
      }

      const { lastID } = await connection.run(USERS_QUERY.INSERT, {
        '$color': randomColor(),
        '$name': username,
      });
      const createdUser = await connection.get(USERS_QUERY.SELECT_BY_ID, {
        '$id': lastID!
      });
      response.status(200);
      response.send({
        createdUser,
      });
    } catch (e) {
      handleServerError(response);
    } finally {
      connection.close();
    }

    // IO_SERVER.emit("New User Created", createdUser);
    // emitUserChange();
  }

  public static async update(request: Request<IUser>, response: Response): Promise<void> {
    const connection = await getDatabaseConnection();
    try {
      const { name, color } = request.body;
      await connection.run(USERS_QUERY.UPDATE, {
        '$id': request.params.id,
        '$name': name,
        '$color': color,
      });
      const users = await connection.run(USERS_QUERY.SELECT);
      response.status(200);
      response.send({
        message: `User ${request.params.id} has been updated.`
      });
    } catch (e) {
      handleServerError(response);
    } finally {
      connection.close();
    }
    // socket.broadcast.emit("User update", users);
    // socket.emit("Current User Updated", user);
  }

  public static async getById(request: Request<{ id: string; }>, response: Response): Promise<void> {
    const connection = await getDatabaseConnection();
    try {
      const user = await connection.get(USERS_QUERY.SELECT_BY_ID, { '$id': request.params.id });

      response.status(200);
      response.send(user);
    } catch (e) {
      handleServerError(response);
    } finally {
      connection.close();
    }
  }

}