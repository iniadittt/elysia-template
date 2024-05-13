import { PageAuthentication } from '../../middlewares/authentication';
import { ResponseAuthentication } from '../../utils/global.interface';

export default class AdminView {
  private pageAuthentication: typeof PageAuthentication;

  constructor() {
    this.pageAuthentication = PageAuthentication;
  }

  public index = async ({
    cookie: { auth },
  }: {
    cookie: { auth: any };
  }): Promise<any> => {
    console.log(auth.value);
    try {
      return Bun.file('public/pages/admin/index.html');
    } catch (error: any) {
      return Bun.file('public/pages/errors/server.html');
    }
  };
}
