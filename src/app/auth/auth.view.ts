import enviroment from '../../config/environment';
import { ResponseAuthentication } from '../../utils/global.interface';
import { PageAuthentication } from '../../middlewares/authentication';

export default class AuthView {
  private env: typeof enviroment;
  private pageAuthentication: typeof PageAuthentication;

  constructor() {
    this.env = enviroment;
    this.pageAuthentication = PageAuthentication;
  }

  public login = async (): Promise<any> => {
    try {
      return Bun.file('public/pages/auth/login.html');
    } catch (error: any) {
      return Bun.file('public/pages/errors/server.html');
    }
  };

  public register = async (): Promise<any> => {
    try {
      return Bun.file('public/pages/auth/register.html');
    } catch (error: any) {
      return Bun.file('public/pages/errors/server.html');
    }
  };
}
