import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { load } from 'yamljs';
import { AllExceptionsFilter } from './core/all-exceptions-filter';
import logger from './core/logger';
import config from './configs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { LoggingInterceptor } from './core/logging.interceptor';

async function bootstrap() {
  const USE_FASTIFY = config.USE_FASTIFY;
  const app = await NestFactory.create(
    AppModule,
    USE_FASTIFY ? new FastifyAdapter() : new ExpressAdapter(),
    {
      logger: console,
    },
  );
  const swaggerDocument = load(join(__dirname, '../doc/api.yaml'));
  SwaggerModule.setup('doc', app, swaggerDocument);
  app.useGlobalFilters(new AllExceptionsFilter());
  // app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(config.PORT || 4000);
}
bootstrap();

process.on('uncaughtException', (error: Error) => {
  logger.error(error.message);
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

process.on('unhandledRejection', (reason: Error) => {
  logger.error(reason.message);
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});
