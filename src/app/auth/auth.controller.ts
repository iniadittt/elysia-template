import { Elysia, Context } from 'elysia';
import environment from '../../config/environment';
import AuthService from './auth.service';
import AuthOptions from './auth.options';
import AuthView from './auth.view';
import ResponseError from '../../utils/response';
import * as ResponseType from '../../utils/response.interface';
import { IRegister, ILogin } from './auth.interface';
import {
  ResponseAuthentication,
  ResponseService,
} from '../../utils/global.interface';
import { Role } from '@prisma/client';
import { PageAuthentication } from '../../middlewares/authentication';
import { cookie } from '@elysiajs/cookie';

export default class AuthController {
  private app: Elysia;
  private env: typeof environment;
  private authRouting: string;
  private authView: AuthView;
  private authService: AuthService;
  private authOptions: AuthOptions;
  private responseError: ResponseError;

  constructor(app: Elysia) {
    this.app = app;
    this.env = environment;
    this.authRouting = this.env.page.auth;
    this.authView = new AuthView();
    this.authService = new AuthService();
    this.authOptions = new AuthOptions();
    this.responseError = new ResponseError();
    this.routing();
  }

  private routing = () => {
    this.app.guard(
      {
        async beforeHandle(context: any) {
          const { jwt, set, cookie }: { jwt: any; set: any; cookie: any } =
            context;
          const isAdmin: ResponseAuthentication = await PageAuthentication(
            jwt,
            cookie,
            'admin',
          );
          if (isAdmin.isAuthenticated) {
            set.status = 401;
            set.headers['x-powered-by'] = environment.author;
            return Bun.file('public/pages/admin/index.html');
          }
          const isUser: ResponseAuthentication = await PageAuthentication(
            jwt,
            cookie,
            'user',
          );
          if (isUser.isAuthenticated) {
            set.status = 401;
            set.headers['x-powered-by'] = environment.author;
            return Bun.file('public/pages/user/index.html');
          }
        },
      },
      (application) =>
        application.group(this.authRouting, (app) =>
          app
            .get('/login', this.authView.login)
            .get('/register', this.authView.register)
            .post('/login', this.login, this.authOptions.loginOption)
            .post('/register', this.register, this.authOptions.registerOption),
        ),
    );
  };

  private register = async (
    ctx: Context,
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

  private login = async ({
    body,
    jwt,
    cookie: { auth },
  }: {
    body: ILogin;
    jwt: any;
    cookie: { auth: any };
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
      auth.value = token;
      return this.responseError.successWithData(200, result.message, {
        token,
        path,
      });
    } catch (error: any) {
      return this.responseError.errorServer(error.message);
    }
  };
}
