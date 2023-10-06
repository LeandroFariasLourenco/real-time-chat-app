import { Response } from "express";

export const handleServerError = (response: Response) => {
  response.status(500);
  response.send({
    message: "Internal Server Error"
  });
}