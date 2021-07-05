import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthRepository {
  constructor(private readonly usersService: UsersService) {
  }

  findByLogin(login) {
    return this.usersService.findByLogin(login);
  }

  findById(id: string) {
    return this.usersService.findOne(id);
  }

}
