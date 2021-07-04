import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity)
              private usersRepository: Repository<UserEntity>,) {

  }

  create(createUserDto: CreateUserDto) {
    const newEntity = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newEntity);
  }

  findAll() {
    console.log('+-----');
    return this.usersRepository.find({ where: {} })
  }

  findOne(id: string) {
    console.log('++++++++++');
    return this.usersRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
