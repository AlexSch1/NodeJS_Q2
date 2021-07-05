import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { TaskEntity } from '../entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TaskEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
