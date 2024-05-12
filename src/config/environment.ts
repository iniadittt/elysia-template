import { Enviroment } from '../utils/global.interface';

const enviroment: Enviroment = {
  author: process.env.AUTHOR || 'ADITYA',
  app: {
    port: Number(process.env.PORT) || 3000,
  },
  database: {
    production:
      process.env.DATABASE_URL_PROD || 'mysql://root:root@localhost:3306/db',
    development:
      process.env.DATABASE_URL_DEV || 'mysql://root:root@localhost:3306/db',
  },
  token: {
    secret: process.env.TOKEN_SECRET || 'token_secret',
    expired: Number(process.env.TOKEN_EXPIRED) || 1,
  },
  page: {
    auth: process.env.PAGE_AUTH || '/auth',
    admin: process.env.PAGE_ADMIN || '/admin',
    user: process.env.PAGE_USER || '/user',
  },
};

export default enviroment;
