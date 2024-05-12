import database from '../../config/database';
import enviroment from '../../config/environment';
import { User } from '@prisma/client';

export default class UserService {
  private db: typeof database;
  private env: typeof enviroment;

  constructor() {
    this.db = database;
    this.env = enviroment;
  }
}
