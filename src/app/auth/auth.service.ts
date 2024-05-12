import database from '../../config/database';
import enviroment from '../../config/environment';
import { User } from '@prisma/client';
import { ILogin, IRegister } from './auth.interface';
import { ResponseService } from '../../utils/global.interface';

export default class AuthService {
  private db: typeof database;
  private env: typeof enviroment;

  constructor() {
    this.db = database;
    this.env = enviroment;
  }

  public register = async (body: IRegister): Promise<ResponseService> => {
    const matchPassword: boolean = body.password === body.confirmPassword;
    if (!matchPassword)
      return {
        error: true,
        message: 'Password and confirm password not match',
      };
    const user: User | null = await this.db.user.findUnique({
      where: { email: body.email },
    });
    if (user)
      return {
        error: true,
        message: 'Email already registered',
      };
    const hashPassword: string = await Bun.password.hash(body.password, {
      algorithm: 'bcrypt',
      cost: 10,
    });
    const registeredUser: User | null = await this.db.user.create({
      data: {
        email: body.email,
        password: hashPassword,
        name: body.name,
        role: 'user',
      },
    });
    if (!registeredUser) return { error: true, message: 'Registration failed' };
    return { error: false, message: 'Registration successful' };
  };

  public login = async (body: ILogin): Promise<ResponseService> => {
    const user: User | null = await this.db.user.findUnique({
      where: { email: body.email },
    });
    if (!user) return { error: true, message: 'Email and password wrong' };
    const matchPassword: boolean = await Bun.password.verify(
      body.password,
      user.password,
      'bcrypt',
    );
    if (!matchPassword)
      return { error: true, message: 'Email and password wrong' };
    return { error: false, message: 'Login successful', data: user };
  };
}
