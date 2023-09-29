export const USERS_QUERY = {
  CREATE_TABLE: `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      color VARCHAR(255) NOT NULL
    );
  `,
  DROP_TABLE: `
    DROP TABLE users
  `,
  INSERT: `
    INSERT INTO users(name, color) VALUES ($name, $color)
  `,
  SELECT: `
    SELECT * FROM users
  `,
  SELECT_BY_ID: `
    SELECT * FROM users WHERE users.id = $id
  `,
  UPDATE: `
    UPDATE users SET name = $name, color = $color WHERE id = $id
  `,
  UPDATE_COLOR: `
    UPDATE users SET color = $color WHERE id = $id
  `
};