import AdminController from './admin.controller';
import AdminOptions from './admin.options';

const adminController: AdminController = new AdminController();
const adminOptions: AdminOptions = new AdminOptions();

const AdminModule = (app) => app.get('/', adminController.index);

export default AdminModule;
