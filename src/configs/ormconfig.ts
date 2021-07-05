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
  // entities: ['src/entities/*.entity.{ts,js}'],
  migrations: ['dist/migration/**/*.{ts,js}'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
  },
} as ConnectionOptions;
// entities: ['src/entities/*.ts'],
// {
//   "type": "postgres",
//   "host": "yourhost",
//   "port": 5423,
//   "username": "username",
//   "password": "password",
//   "database": "your_db",
//   "synchronize": true,
//   "entities": [
//   "src/modules/**/*.entity.{ts,js}"
// ],
//   "migrations": [
//   "src/migrations/**/*.{ts,js}"
// ],
//   "cli": {
//   "entitiesDir": "src/modules",
//     "migrationsDir": "src/migrations"
// }
// }
