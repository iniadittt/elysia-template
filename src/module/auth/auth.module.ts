import AuthController from './auth.controller';
import AuthOptions from './auth.options';

const authController: AuthController = new AuthController();
const authOptions: AuthOptions = new AuthOptions();

const AuthModule = (app) =>
  app
    .get('/login', authController.getLogin)
    .get('/register', authController.getRegister)
    .post('/login', authController.postLogin, authOptions.login)
    .post('/register', authController.postRegister, authOptions.register);

export default AuthModule;
