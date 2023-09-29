export const USERS_QUERY = {
  CREATE_TABLE: `
    CREATE TABLE IF NOT EXISTS Users (
      Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      Name VARCHAR(255) NOT NULL,
      Color VARCHAR(255) NOT NULL
    );
  `,
  DROP_TABLE: `
    DROP TABLE Users
  `,
  INSERT: `
    INSERT INTO Users(Name, Color) VALUES (name, color)
  `,
  SELECT: `
    SELECT * FROM TABLE Users
  `,
  UPDATE: `
    UPDATE Users SET Name = name WHERE Id = id
  `,
};