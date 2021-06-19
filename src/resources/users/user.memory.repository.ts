// import { DB } from'../../common/DB';
import HttpError from '../../utils/error/httpError';
import { StudentDto } from '../../common/interfaces';
import { DeleteResult, getRepository } from 'typeorm';
import { User } from '../../entities/User';

const getAll = (): Promise<User[]> => {
  const rep = getRepository(User);
  return rep.find({where: {}});
  // DB.getAllUsers()
};

const create = (user: StudentDto): Promise<User> => {
  const rep = getRepository(User);
  const newUser = rep.create(user);

  return rep.save(newUser);
};

const get = async (id: string): Promise<User | null> => {
  const rep = getRepository(User);
  const res = await rep.findOne(id);

  if (!res) return null;

  return res;
};

const updateUser = async (userInfo: StudentDto, id: string): Promise<User | null> => {
  const rep = getRepository(User);
  const res = await rep.findOne(id);

  if (!res) return null;

  const updatedUser = await rep.update(id, userInfo);

  return updatedUser.raw;

  // DB.updateUser(userInfo, id)
};

const deleteUser = async (id: string): Promise<'DELETED'> => {
  const rep = getRepository(User);
  const deletedUser: DeleteResult = await rep.delete(id);

  if (deletedUser.affected) return 'DELETED';

  throw new HttpError(404, 'User not found');

  //
  // const user: IUser | null = await DB.getUser(id);
  //
  // if (!user) {
  //   throw new HttpError(404, 'User not found');
  // }
  //
  // return DB.deleteUser(id);
};

export default {getAll, create, get, updateUser, deleteUser};
