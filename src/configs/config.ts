import { config } from 'dotenv';
import { join } from 'path';

config({
  path: join(__dirname, '../../.env'),
});

export default {
  PORT: process.env['PORT'],
  NODE_ENV: process.env['NODE_ENV'],
  MONGO_CONNECTION_STRING: process.env['MONGO_CONNECTION_STRING'],
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
  AUTH_MODE: process.env['AUTH_MODE'] === 'true',
  USE_FASTIFY: process.env['USE_FASTIFY'] === 'true',
};
