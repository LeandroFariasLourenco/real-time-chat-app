import fs from 'fs';

export const MESSAGES_QUERY = {
  CREATE_TABLE: fs.readFileSync(`${__dirname}/create.sql`).toString(),
  DROP_TABLE: fs.readFileSync(`${__dirname}/drop.sql`).toString(),
  INSERT: fs.readFileSync(`${__dirname}/insert.sql`).toString(),
  SELECT: fs.readFileSync(`${__dirname}/select.sql`).toString(),
  SELECT_WITH_USER: fs.readFileSync(`${__dirname}/select-with-user.sql`).toString(),
  SELECT_PRIVATE: fs.readFileSync(`${__dirname}/select-private.sql`).toString()
};
