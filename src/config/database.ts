import { PrismaClient } from '@prisma/client';
import environment from './environment';

const database: PrismaClient = new PrismaClient({
  datasources: {
    db: {
      url: environment.database[
        process.env.BUN_ENV === 'production' ? 'production' : 'development'
      ],
    },
  },
});

export default database;
