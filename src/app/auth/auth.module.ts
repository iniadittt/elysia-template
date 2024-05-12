import { Elysia } from 'elysia';
import AuthController from './auth.controller';

export default class AuthModule {
  private authController: AuthController;

  constructor(public app: Elysia) {
    this.app = app;
    this.authController = new AuthController(this.app);
  }
}
