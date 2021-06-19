import dotenv from 'dotenv';
import path from 'path';
import { ConnectionOptions } from 'typeorm';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export default {
  PORT: process.env['PORT'],
  NODE_ENV: process.env['NODE_ENV'],
  MONGO_CONNECTION_STRING: process.env['MONGO_CONNECTION_STRING'],
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
  AUTH_MODE: process.env['AUTH_MODE'] === 'true',
  orm: {
    type: 'postgres',
    name: 'default',
    host: process.env['DB_HOST'],
    port: process.env['DB_PORT'],
    username: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME'],
    synchronize: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    entities: ["src/entities/*.ts"],
    // migrations: ["src/migrations/*.ts"],
    cli: {
      "entitiesDir": "src/entities",
      // migrationsDir: "src/migrations",
      // "subscribersDir": "src/subscriber"
    }
  } as ConnectionOptions
};
