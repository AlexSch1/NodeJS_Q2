import { config } from 'dotenv';
import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

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
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  entities: [UserEntity],
  // entities: ['src/entities/*.entity.{ts,js}'],
  // migrations: ['./src/migration/*.ts'],
  // cli: {
  //   entitiesDir: 'src/entities',
  //   migrationsDir: 'src/migration',
  // },
} as ConnectionOptions;
// entities: ['src/entities/*.ts'],
