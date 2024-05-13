import UserController from './user.controller';
import UserOptions from './user.options';

const userController: UserController = new UserController();
const userOptions: UserOptions = new UserOptions();

const UserModule = (app) => app.get('/', userController.index);

export default UserModule;
