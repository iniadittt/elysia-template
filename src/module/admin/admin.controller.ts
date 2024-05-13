import { Context } from 'elysia';
import enviroment from '../../config/environment';
import AdminService from './admin.service';
import ResponseError from '../../utils/response';
import { Role } from '@prisma/client';
import { ResponseService } from '../../utils/global.interface';
import * as ResponseType from '../../utils/response.interface';

export default class AdminController {
  private env: typeof enviroment;
  private adminService: AdminService;
  private responseError: ResponseError;

  constructor() {
    this.env = enviroment;
    this.adminService = new AdminService();
    this.responseError = new ResponseError();
  }

  public index = async (): Promise<any> => {
    try {
      return Bun.file('public/pages/admin/index.html');
    } catch (error: any) {
      return Bun.file('public/pages/errors/server.html');
    }
  };
}
