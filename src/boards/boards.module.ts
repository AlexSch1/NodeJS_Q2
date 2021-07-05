import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { BoardsRepository } from './boards.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from '../entities/board.entity';
import { TaskEntity } from '../entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity, TaskEntity])],
  controllers: [BoardsController],
  providers: [BoardsService, BoardsRepository]
})
export class BoardsModule {}
// "jest": {
//   "testEnvironment": "node",
//     "setupFilesAfterEnv": [
//     "./test/setup.js"
//   ]
// },
