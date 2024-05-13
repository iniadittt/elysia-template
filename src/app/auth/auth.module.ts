import { Elysia } from 'elysia';
import AuthController from './auth.controller';

export default class AuthModule {
  public app: Elysia;
  private authController: AuthController;

  constructor() {
    this.app = new Elysia();
    this.authController = new AuthController(this.app);
  }
}
