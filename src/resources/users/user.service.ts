import usersRepo from './user.memory.repository';
import User from './user.model';
import HttpError from '../../utils/error/httpError';
import { IUser } from '../../common/interfaces';

const getAll = (): Promise<IUser[]> => usersRepo.getAll();

const create = ({ name, login, password }: IUser): Promise<IUser | null> =>
  usersRepo.create(new User({ name, login, password }));

const get = async (id: string): Promise<IUser> => {
  const user: IUser | null = await usersRepo.get(id);

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  return user;
};

const updateUser = (userInfo: IUser, id: string): Promise<IUser | null> =>
  usersRepo.updateUser(userInfo, id);

const deleteUser = (id: string): Promise<IUser[] | null> => usersRepo.deleteUser(id);

export default { getAll, create, get, updateUser, deleteUser };
