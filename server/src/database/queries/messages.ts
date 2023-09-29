export const MESSAGES_QUERY = {
  CREATE_TABLE: `
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      content VARCHAR(255) NOT NULL,
      timestamp VARCHAR(255) NOT NULL,
      FOREIGN KEY (userId) REFERENCES users (id)
    );
  `,
  DROP_TABLE: `
    DROP TABLE Messages
  `,
  INSERT: `
    INSERT INTO Messages(userId, content, timestamp) VALUES ($userId, $content, $timestamp)
  `,
  SELECT: `
    SELECT * FROM Messages
  `,
  SELECT_WITH_USER: `
    SELECT * FROM messages INNER JOIN users on messages.userId = users.id
  `
};
