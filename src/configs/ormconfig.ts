import { config } from 'dotenv';
import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { TaskEntity } from '../entities/task.entity';
import { BoardEntity } from '../entities/board.entity';
import { ColumnEntity } from '../entities/column.entity';

config({
  path: join(__dirname, '../../.env'),
});

export default {
  type: 'postgres',
  name: 'default',
  host: process.env['DB_HOST'],
  port: +process.env['POSTGRES_PORT'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DB'],
  synchronize: false,
  autoReconnect: true,
  migrationsRun: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  // autoLoadEntities: true,
  entities: [UserEntity, TaskEntity, BoardEntity, ColumnEntity],
  migrations: ['dist/migration/**/*.{ts,js}'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
  },
} as ConnectionOptions;
