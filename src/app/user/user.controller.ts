import { Elysia, Context } from 'elysia';
import environment from '../../config/environment';
import UserView from './user.view';
import UserService from './user.service';
import UserOptions from './user.options';
import ResponseError from '../../utils/response';
import enviroment from '../../config/environment';
import * as ResponseType from '../../utils/response.interface';
import { User } from '@prisma/client';
import {
  ResponseAuthentication,
  ResponseService,
} from '../../utils/global.interface';
import { PageAuthentication } from '../../middlewares/authentication';

export default class UserController {
  private app: Elysia;
  private env: typeof enviroment;
  private userRouting: string;
  private userView: UserView;
  private userService: UserService;
  private userOptions: UserOptions;
  private responseError: ResponseError;

  constructor(app: Elysia) {
    this.app = app;
    this.env = enviroment;
    this.userRouting = this.env.page.user;
    this.userView = new UserView();
    this.userService = new UserService();
    this.userOptions = new UserOptions();
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
          if (!isUser.isAuthenticated) {
            set.status = 401;
            set.headers['x-powered-by'] = environment.author;
            return Bun.file('public/pages/auth/login.html');
          }
        },
      },
      (application) =>
        application.group(this.userRouting, (app) =>
          app.get('/', this.userView.index),
        ),
    );
  };
}
