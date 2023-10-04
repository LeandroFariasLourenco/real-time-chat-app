import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { MESSAGES_QUERY } from './queries/messages';
import { USERS_QUERY } from './queries/users';
import chalk from 'chalk';

export const setupDatabase = async () => {
  const database = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });

  sqlite3.verbose();
  if (process.env.DB_RESET) {
    await database.exec(MESSAGES_QUERY.DROP_TABLE)
    await database.exec(USERS_QUERY.DROP_TABLE);
    console.log(chalk.yellow('The database has been reset'))
  }

  await database.exec(USERS_QUERY.CREATE_TABLE);
  await database.exec(MESSAGES_QUERY.CREATE_TABLE);
  console.log(chalk.green('The database was created'))
};

export const getDatabaseConnection = async () => {

  sqlite3.verbose();
  return await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  })
}
