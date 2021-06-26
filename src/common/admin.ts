import usersService from '../resources/users/user.service';
import { tryConnect } from './_db';

async function createAdmin() {
  try {
    await usersService.create({
      login: 'admin',
      password: 'admin',
      name: 'admin',
    });
  } catch (e) {
    console.error(e)
  }

}

tryConnect(createAdmin);
