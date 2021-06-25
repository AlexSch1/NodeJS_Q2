import authRepo from './auth.repository';
import bcrypt from 'bcryptjs';
import { User } from '../../entities/User';


const login = async ( login: string, password: string ): Promise<User | null | 403 > => {
  const candidate: User | null = await authRepo.get(login, password);
  if (candidate) {
    const passwordCheckResult = bcrypt.compareSync(
      password,
      candidate.password
    );

    if (passwordCheckResult) {
      return candidate
    } else {
      return 403;
    }
  } else {
    return null;
  }
}

export default { login }


