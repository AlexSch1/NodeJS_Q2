import usersRepo from './user.memory.repository';
// import User from './user.model';
import { User } from '../../entities/User';
// import HttpError from '../../utils/error/httpError';
import { IUser, StudentDto } from '../../common/interfaces';

const getAll = (): Promise<User[]> => usersRepo.getAll();

const create = ({ name, login, password }: StudentDto): Promise<any> =>
  usersRepo.create({ name, login, password });

const get = async (id: string): Promise<User | null> => usersRepo.get(id);

const updateUser = (userInfo: IUser, id: string): Promise<User | null> =>
  usersRepo.updateUser(userInfo, id);

const deleteUser = (id: string): Promise<'DELETED'> => usersRepo.deleteUser(id);

export default { getAll, create, get, updateUser, deleteUser };
