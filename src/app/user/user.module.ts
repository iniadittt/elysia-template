import { Elysia } from 'elysia';
import UserController from './user.controller';

export default class UserModule {
  public app: Elysia;
  private userController: UserController;

  constructor() {
    this.app = new Elysia();
    this.userController = new UserController(this.app);
  }
}
