import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}
  async login(login) {
    const user = await this.authRepository.findByLogin(login);

    if (!user) {
      return null;
    }

    return user;
  }

  validateUser(userId: string) {
    return this.authRepository.findById(userId);
  }

  createToken(login, userId) {
    return this.jwtService.sign(
      {
        login,
        userId,
      },
    );
  }
}
