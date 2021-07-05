import {
  Controller,
  Post,
  Body,
  Patch,
  NotFoundException,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { compareSync } from 'bcryptjs';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() userLoginDto: LoginDto) {
    const { password, login } = userLoginDto;
    let loginSuccess = false;

    const user = await this.authService.login(login);

    if (!user) {
      throw new NotFoundException();
    }

    if (user) {
      loginSuccess = compareSync(
        password,
        user.password
      );
    }

    if (loginSuccess) {
      const token = this.authService.createToken(user.login, user.id);
      return {
        token,
      };
    }

    throw new HttpException(
      'Incorrect email or password',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
