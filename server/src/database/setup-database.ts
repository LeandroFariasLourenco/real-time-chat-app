import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { MESSAGES_QUERY } from './queries/messages';
import { USERS_QUERY } from './queries/users';

export const setupDatabase = async () => {
  const database = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });

  await database.exec(MESSAGES_QUERY.CREATE_TABLE);
  await database.exec(USERS_QUERY.CREATE_TABLE);

  return database;
};
