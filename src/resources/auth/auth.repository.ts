import { User } from '../../entities/User';
import { getRepository } from 'typeorm';

const get = async (login: string, _password: string): Promise<User | null> => {
  const rep = getRepository(User);
  const res = await rep.findOne({ login });

  if (!res) return null;

  return res;
};

export default { get };
