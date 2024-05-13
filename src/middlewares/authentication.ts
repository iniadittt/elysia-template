import { User } from '@prisma/client';
import database from '../config/database';
import { ResponseAuthentication } from '../utils/global.interface';

export const PageAuthentication = async (
  jwt: any,
  token: string,
  allowUser: 'admin' | 'user',
): Promise<ResponseAuthentication> => {
  if (!token) return { isAuthenticated: false, message: 'Unauthorized' };
  const profile = await jwt.verify(token);
  if (!profile) return { isAuthenticated: false, message: 'Unauthorized' };
  const user: User | null = await database.user.findUnique({
    where: { id: profile.id },
  });
  if (!user) return { isAuthenticated: false, message: 'Unauthorized' };
  const isAdmin: boolean = user.role === allowUser;
  if (!isAdmin) return { isAuthenticated: false, message: 'Unauthorized' };
  return { isAuthenticated: true, message: 'Authorized' };
};
