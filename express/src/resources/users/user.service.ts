import bcrypt from 'bcryptjs';
import usersRepo from './user.memory.repository';
import { User } from '../../entities/User';
import { IUser, StudentDto } from '../../common/interfaces';

const getAll = (): Promise<User[]> => usersRepo.getAll();

const create = ({ name, login, password }: StudentDto): Promise<User> => {
  const salt = bcrypt.genSaltSync(10);
  let passwordDecoded;

  if (password) {
    passwordDecoded = bcrypt.hashSync(password, salt);
  }

  return usersRepo.create({ name, login, password: passwordDecoded });
};

const get = async (id: string): Promise<User | null> => usersRepo.get(id);

const updateUser = (userInfo: IUser, id: string): Promise<User | null> =>
  usersRepo.updateUser(userInfo, id);

const deleteUser = (id: string): Promise<'DELETED'> => usersRepo.deleteUser(id);

export default { getAll, create, get, updateUser, deleteUser };
