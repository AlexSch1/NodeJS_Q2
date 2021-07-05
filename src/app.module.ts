import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { BoardsModule } from './boards/boards.module';
import config from './configs/ormconfig';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(config), TasksModule, BoardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
