import { Context } from 'elysia';
import enviroment from '../../config/environment';
import AuthService from './auth.service';
import ResponseError from '../../utils/response';
import { Role } from '@prisma/client';
import { ResponseService } from '../../utils/global.interface';
import { ILogin, IRegister } from './auth.interface';
import * as ResponseType from '../../utils/response.interface';

export default class AuthController {
  private env: typeof enviroment;
  private authService: AuthService;
  private responseError: ResponseError;

  constructor() {
    this.env = enviroment;
    this.authService = new AuthService();
    this.responseError = new ResponseError();
  }

  public getLogin = async (): Promise<any> => {
    try {
      return Bun.file('public/pages/auth/login.html');
    } catch (error: any) {
      return Bun.file('public/pages/errors/server.html');
    }
  };

  public getRegister = async (): Promise<any> => {
    try {
      return Bun.file('public/pages/auth/register.html');
    } catch (error: any) {
      return Bun.file('public/pages/errors/server.html');
    }
  };

  public postLogin = async ({
    body,
    jwt,
    cookie: { auth },
  }): Promise<ResponseType.ResponseSuccess | ResponseType.ResponseError> => {
    try {
      const result: ResponseService = await this.authService.login(
        body as ILogin,
      );
      if (result.error)
        return this.responseError.errorClient(400, result.message);
      const role: Role = result.data.role;
      const path: string =
        role === 'admin' ? this.env.page.admin : this.env.page.user;
      const token: string = await jwt.sign({ id: result.data.id });
      auth.set({
        path: '/',
        value: token,
        secret: this.env.cookie.secret,
        maxAge: this.env.cookie.expired * 86400,
        httpOnly: true,
        secure: true,
      });
      return this.responseError.successWithData(200, result.message, {
        token,
        path,
      });
    } catch (error: any) {
      return this.responseError.errorServer(error.message);
    }
  };

  public postRegister = async (
    ctx,
  ): Promise<ResponseType.ResponseSuccess | ResponseType.ResponseError> => {
    try {
      const body: IRegister = ctx.body as IRegister;
      const result: ResponseService = await this.authService.register(body);
      if (result.error)
        return this.responseError.errorClient(400, result.message);
      return this.responseError.success(200, result.message);
    } catch (error: any) {
      return this.responseError.errorServer(error.message);
    }
  };
}
