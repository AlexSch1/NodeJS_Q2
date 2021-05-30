import { v1 } from 'uuid';
import { IUser } from '../../common/interfaces';

export default class User {
  public id: string;

  public name: string;

  public login: string;

  public password: string;

  constructor({
    id = v1(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: IUser) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUser): IUser {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
