import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './resources/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './resources/tasks/tasks.module';
import { BoardsModule } from './resources/boards/boards.module';
import config from './configs/ormconfig';
import { LoggerMiddleware } from './core/logger.middleware';
import { AuthModule } from './resources/auth/auth.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(config),
    TasksModule,
    BoardsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/(.*)');
  }
}
