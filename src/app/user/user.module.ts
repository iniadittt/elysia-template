import { Elysia } from 'elysia';
import UserController from './user.controller';

export default class UserModule {
  private userController: UserController;

  constructor(public app: Elysia) {
    this.app = app;
    this.userController = new UserController(this.app);
  }
}
