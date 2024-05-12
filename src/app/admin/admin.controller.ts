import { Elysia, Context } from 'elysia';
import environment from '../../config/environment';
import AdminView from './admin.view';
import AdminService from './admin.service';
import AdminOptions from './admin.options';
import ResponseError from '../../utils/response';
import * as ResponseType from '../../utils/response.interface';
import { User } from '@prisma/client';
import {
  ResponseAuthentication,
  ResponseService,
} from '../../utils/global.interface';
import { PageAuthentication } from '../../middlewares/authentication';

export default class AdminController {
  public app: Elysia;
  private env: typeof environment;
  private adminRouting: string;
  private adminView: AdminView;
  private adminService: AdminService;
  private adminOptions: AdminOptions;
  private responseError: ResponseError;

  constructor(app: Elysia) {
    this.app = app;
    this.env = environment;
    this.adminRouting = this.env.page.admin;
    this.adminView = new AdminView();
    this.adminService = new AdminService();
    this.adminOptions = new AdminOptions();
    this.responseError = new ResponseError();
    this.routing();
  }

  private routing = () => {
    this.app.guard(
      {
        async beforeHandle(context: any) {
          const { jwt, set, cookie }: { jwt: any; set: any; cookie: any } =
            context;
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
          const isAdmin: ResponseAuthentication = await PageAuthentication(
            jwt,
            cookie,
            'admin',
          );
          if (!isAdmin.isAuthenticated) {
            set.status = 401;
            set.headers['x-powered-by'] = environment.author;
            return Bun.file('public/pages/auth/login.html');
          }
        },
      },
      (application) =>
        application.group(this.adminRouting, (app) =>
          app.get('/', this.adminView.index),
        ),
    );
  };
}
