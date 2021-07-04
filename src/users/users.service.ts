import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const newEntity: CreateUserDto = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newEntity);
  }

  findAll(): Promise<CreateUserDto[]> {
    return this.usersRepository.find({ where: {} });
  }

  findOne(id: string): Promise<CreateUserDto | undefined> {
    return this.usersRepository.findOne(id);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<CreateUserDto | null> {
    const res: CreateUserDto | undefined = await this.usersRepository.findOne(
      id,
    );

    if (!res) return null;
    const updatedUser: UpdateResult = await this.usersRepository.update(
      id,
      updateUserDto,
    );
    return updatedUser.raw;
  }

  async remove(id: string): Promise<'DELETED' | null> {
    const deletedUser: DeleteResult = await this.usersRepository.delete(id);

    if (deletedUser.affected) {
      // const tasksRepBuilder = getRepository(Task).createQueryBuilder();
      // await tasksRepBuilder
      //   .update(Task)
      //   .set({ userId: null })
      //   .where('userId = :userId', { userId: id })
      //   .execute();
      return 'DELETED';
    }
    return null;
  }
}
