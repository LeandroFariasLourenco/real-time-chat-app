import { Request, Response } from "express";
import { getDatabaseConnection } from "../database/database";
import { CHAT_QUERY } from "../database/queries/chat";
import { MESSAGES_QUERY } from "../database/queries/messages";
import { IO_SERVER } from "../server";
import { handleServerError } from "../utils/handle-error";

export abstract class Messages {
  public static urls = {
    get: '/messages',
    create: '/messages',
  }

  public static async get(request: Request, response: Response): Promise<void> {
    const connection = await getDatabaseConnection();
    const { firstUserId, secondUserId } = request.query;
    try {
      const chat = await connection.get(CHAT_QUERY.SELECT_WITH_USER, {
        '$firstUserId': firstUserId,
        '$secondUserId': secondUserId,
      });

      const messages = (await connection.all(MESSAGES_QUERY.SELECT_PRIVATE, {
        '$chatId': chat.id,
      })).map((message) => {
        return {
          id: message.id,
          chatId: message.chatId,
          content: message.content,
          timestamp: message.timestamp,
          user: {
            id: message.userId,
            name: message.name,
            color: message.color
          }
        }
      });
      
      response.status(200);
      response.send(messages);
    } catch (e) {
      handleServerError(response);
    } finally {
      connection.close();
    }
  }

  public static async create(request: Request, response: Response): Promise<void> {
    const connection = await getDatabaseConnection();
    try {
      const {
        firstUserId,
        secondUserId,
        message,
      } = request.body;
      const chat = await connection.get(CHAT_QUERY.SELECT_WITH_USER, {
        '$firstUserId': firstUserId,
        '$secondUserId': secondUserId,
      });

      await connection.run(MESSAGES_QUERY.INSERT, {
        '$userId': message.user.id,
        '$chatId': chat.id,
        '$content': message.content,
        '$timestamp': message.timestamp,
      });

      const messages = (await connection.all(MESSAGES_QUERY.SELECT_WITH_USER)).map((message) => {
        return {
          id: message.id,
          content: message.content,
          chatId: chat.id,
          timestamp: new Date().toISOString(),
          user: {
            id: message.userId,
            name: message.name,
            color: message.color
          }
        }
      });

      response.status(200);
      response.send(messages.at(-1));
    } catch (e) {
      handleServerError(response);
    } finally {
      connection.close();
    }
  }
}
