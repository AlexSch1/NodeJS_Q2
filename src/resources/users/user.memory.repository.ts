import { DB } from'../../common/DB';
import HttpError from '../../utils/error/httpError';
import { IUser } from '../../common/interfaces';

const getAll = (): Promise<IUser[]> => DB.getAllUsers();

const create = (user:IUser): Promise<IUser> => DB.createUser(user);

const get = (id: string): Promise<IUser | null> => DB.getUser(id);

const updateUser = (userInfo: IUser, id: string): Promise<IUser | null> => DB.updateUser(userInfo, id);

const deleteUser = async (id: string): Promise<IUser[]> => {
  const user: IUser | null = await DB.getUser(id);

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  return DB.deleteUser(id);
};

export default {getAll, create, get, updateUser, deleteUser};
