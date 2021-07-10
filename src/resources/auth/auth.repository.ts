import { getRepository } from 'typeorm';
import { User } from '../../entities/User';

const get = async (login: string): Promise<User | null> => {
  const rep = getRepository(User);
  const res = await rep.findOne({ login });

  if (!res) return null;

  return res;
};

export default { get };
