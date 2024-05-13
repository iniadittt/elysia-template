import { Elysia } from 'elysia';
import AdminController from './admin.controller';

export default class AdminModule {
  public app: Elysia;
  private adminController: AdminController;

  constructor() {
    this.app = new Elysia();
    this.adminController = new AdminController(this.app);
  }
}
