import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { TaskEntity } from '../../entities/task.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
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

  async remove(userId: string): Promise<'DELETED' | null> {
    const deletedUser: DeleteResult = await this.usersRepository.delete(userId);
    if (deletedUser.affected) {
      const tasksRepBuilder = this.tasksRepository.createQueryBuilder();
      await tasksRepBuilder
        .update(TaskEntity)
        .set({ userId: null })
        .where('userId = :userId', { userId: userId })
        .execute();
      return 'DELETED';
    }
    return null;
  }
}
