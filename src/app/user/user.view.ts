import { PageAuthentication } from '../../middlewares/authentication';
import { ResponseAuthentication } from '../../utils/global.interface';

export default class UserView {
  private pageAuthentication: typeof PageAuthentication;

  constructor() {
    this.pageAuthentication = PageAuthentication;
  }

  public index = async (): Promise<any> => {
    try {
      return Bun.file('public/pages/user/index.html');
    } catch (error: any) {
      return Bun.file('public/pages/errors/server.html');
    }
  };
}
