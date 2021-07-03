import bcrypt from 'bcryptjs';
import authRepo from './auth.repository';
import { User } from '../../entities/User';

const login = async (
  loginUser: string,
  password: string
): Promise<User | null | 403> => {
  const candidate: User | null = await authRepo.get(loginUser);
  if (candidate) {
    const passwordCheckResult = bcrypt.compareSync(
      password,
      candidate.password
    );

    if (passwordCheckResult) {
      return candidate;
    }
    return 403;
  }
  return null;
};

export default { login };
