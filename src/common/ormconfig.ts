import dotenv from 'dotenv';
import path from 'path';
import { ConnectionOptions } from 'typeorm';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export default {
  type: 'postgres',
  name: 'default',
  host: process.env['DB_HOST'],
  port: process.env['POSTGRES_PORT'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DB'],
  synchronize: false,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  entities: ["src/entities/*.ts"],
  migrations: ["./src/migration/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migration",
  }
} as ConnectionOptions;
