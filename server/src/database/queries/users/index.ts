import fs from 'fs';

export const USERS_QUERY = {
  CREATE_TABLE: fs.readFileSync(`${__dirname}/create.sql`).toString(),
  DROP_TABLE: fs.readFileSync(`${__dirname}/drop.sql`).toString(),
  INSERT: fs.readFileSync(`${__dirname}/insert.sql`).toString(),
  SELECT: fs.readFileSync(`${__dirname}/select.sql`).toString(),
  SELECT_BY_ID: fs.readFileSync(`${__dirname}/select-by-id.sql`).toString(),
  UPDATE: fs.readFileSync(`${__dirname}/update.sql`).toString(),
  SELECT_BY_USERNAME: fs.readFileSync(`${__dirname}/select-by-username.sql`).toString(),
};