import { Context } from 'elysia';
import enviroment from '../../config/environment';
import UserService from './user.service';
import ResponseError from '../../utils/response';
import { Role } from '@prisma/client';
import { ResponseService } from '../../utils/global.interface';
import * as ResponseType from '../../utils/response.interface';

export default class UserController {
  private env: typeof enviroment;
  private userService: UserService;
  private responseError: ResponseError;

  constructor() {
    this.env = enviroment;
    this.userService = new UserService();
    this.responseError = new ResponseError();
  }

  public index = async (): Promise<any> => {
    try {
      return Bun.file('public/pages/user/index.html');
    } catch (error: any) {
      return Bun.file('public/pages/errors/server.html');
    }
  };
}
