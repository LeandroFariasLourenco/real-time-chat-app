import expressSession from 'express-session';

export const session = expressSession({
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
});