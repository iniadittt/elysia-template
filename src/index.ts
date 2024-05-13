// APP
import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { html } from '@elysiajs/html';
import { cookie } from '@elysiajs/cookie';
import { staticPlugin } from '@elysiajs/static';
import enviroment from './config/environment';

// MODULE
import AuthModule from './module/auth/auth.module';
import AdminModule from './module/admin/admin.module';
import UserModule from './module/user/user.module';

// GUARD
import AuthGuard from './module/auth/auth.guard';
import AdminGuard from './module/admin/admin.guard';
import UserGuard from './module/user/user.guard';
import ResponseError from './utils/response';

const app = new Elysia()
  .use(html())
  .use(
    jwt({
      name: 'jwt',
      secret: enviroment.token.secret,
      exp: enviroment.token.expired,
    }),
  )
  .use(
    cookie({
      path: '/',
      secret: enviroment.cookie.secret,
      maxAge: enviroment.cookie.expired * 86400,
      httpOnly: true,
      secure: true,
    }),
  )
  .use(staticPlugin())
  .get('/', () => 'HELLO')
  .post('/logout', async ({ cookie }): Promise<any> => {
    cookie.auth.set({ maxAge: 0 });
    return new ResponseError().success(200, 'Logout successful');
  })
  .guard(
    {
      beforeHandle: async (context) => await AuthGuard(context),
    },
    (app) => app.group('/auth', AuthModule),
  )
  .guard(
    {
      beforeHandle: async (context) => await AdminGuard(context),
    },
    (app) => app.group('/admin', AdminModule),
  )
  .guard(
    {
      beforeHandle: async (context) => await UserGuard(context),
    },
    (app) => app.group('/user', UserModule),
  )
  .listen(enviroment.app.port);

console.log(
  `🦊 [SERVER] Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
