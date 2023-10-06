import fs from 'fs';

export const CHAT_QUERY = {
  INSERT: fs.readFileSync(`${__dirname}/insert.sql`).toString(),
  CREATE_TABLE: fs.readFileSync(`${__dirname}/create.sql`).toString(),
  DROP_TABLE: fs.readFileSync(`${__dirname}/drop.sql`).toString(),
  SELECT_WITH_USER: fs.readFileSync(`${__dirname}/select-with-user.sql`).toString()
}