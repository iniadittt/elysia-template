// APP
import { Elysia, Context } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';
import enviroment from './config/environment';

// MODULE
import AuthModule from './app/auth/auth.module';
import AdminModule from './app/admin/admin.module';
import UserModule from './app/user/user.module';

// TYPE
import { Port } from './utils/global.interface';

const bootstrap = async (): Promise<void> => {
  // APPLICATION

  const app: Elysia = new Elysia();
  const port: Port = enviroment.app.port;

  // APP CONFIGURATION
  app.use(html());
  app.use(staticPlugin());
  app.use(
    jwt({
      name: 'jwt',
      secret: enviroment.token.secret,
      exp: `${enviroment.token.expired}h`,
    }),
  );

  new AuthModule(app);
  new AdminModule(app);
  new UserModule(app);

  // PAGES
  app.get('/', async (): Promise<any> => {
    return Bun.file('public/pages/index.html');
  });

  app.get('/public/*', (ctx: Context): any => {
    const path: string = ctx.params['*'];
    return Bun.file(`public/${path}`);
  });

  // RUNNING
  app.listen(port, (): void =>
    console.log(
      `🦊 [SERVER] Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
    ),
  );
};

bootstrap();
