import environment from '../../config/environment';
import { PageAuthentication } from '../../middlewares/authentication';
import { ResponseAuthentication } from '../../utils/global.interface';

const AuthGuard = async (context: any) => {
  const { jwt, set, cookie, redirect } = context;
  const token: string = cookie.auth.value;
  const isAdmin: ResponseAuthentication = await PageAuthentication(
    jwt,
    token,
    'admin',
  );
  if (isAdmin.isAuthenticated) {
    set.status = 401;
    set.headers['x-powered-by'] = environment.author;
    return redirect('/admin', 301);
    // return Bun.file('public/pages/admin/index.html');
  }
  const isUser: ResponseAuthentication = await PageAuthentication(
    jwt,
    token,
    'user',
  );
  if (isUser.isAuthenticated) {
    set.status = 401;
    set.headers['x-powered-by'] = environment.author;
    return redirect('/user', 301);
    // return Bun.file('public/pages/user/index.html');
  }
};

export default AuthGuard;
