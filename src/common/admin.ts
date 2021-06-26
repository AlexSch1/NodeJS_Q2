import usersService from '../resources/users/user.service';
import { tryConnect } from './_db';

async function createAdmin() {
  await usersService.create({
    login: 'admin',
    password: 'admin',
    name: 'admin',
  })
}


tryConnect(createAdmin);
