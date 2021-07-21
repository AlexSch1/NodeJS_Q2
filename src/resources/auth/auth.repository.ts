import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly usersService: UsersService) {}

  findByLogin(login: string) {
    return this.usersService.findByLogin(login);
  }

  findById(id: string) {
    return this.usersService.findOne(id);
  }
}
