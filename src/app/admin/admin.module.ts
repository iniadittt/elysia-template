import { Elysia } from 'elysia';
import AdminController from './admin.controller';

export default class AdminModule {
  private adminController: AdminController;

  constructor(public app: Elysia) {
    this.app = app;
    this.adminController = new AdminController(this.app);
  }
}
