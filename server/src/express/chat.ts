import { Request, Response } from "express";
import { getDatabaseConnection } from "../database/database";
import { CHAT_QUERY } from "../database/queries/chat";
import { handleServerError } from "../utils/handle-error";
import { IO_SERVER } from "../server";

export abstract class Chat {
  public static urls = {
    create: '/chat',
    get: '/chat'
  }

  public static async get(request: Request, response: Response): Promise<void> {

  }

  public static async create(request: Request, response: Response): Promise<void> {
    const connection = await getDatabaseConnection();
    try {
      let chatId: number;
      const {
        firstUserId,
        secondUserId,
      } = request.body;

      const chat = await connection.get(CHAT_QUERY.SELECT_WITH_USER, {
        '$firstUserId': secondUserId,
        '$secondUserId': firstUserId
      });
      
      if (!chat) {
        const { lastID } = await connection.run(CHAT_QUERY.INSERT, {
          '$firstUserId': firstUserId,
          '$secondUserId': secondUserId,
        });
        
        chatId = lastID!;
      } else {
        chatId = chat.id;
      }
      
      response.status(200);
      response.send({
        chatId,
      });
    } catch (e) {
      handleServerError(response);
    } finally {
      connection.close();
    }
  }
}
