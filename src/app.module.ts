import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './resources/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './resources/tasks/tasks.module';
import { BoardsModule } from './resources/boards/boards.module';
import config from './configs/ormconfig';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(config), TasksModule, BoardsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
