import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { load } from 'yamljs';
import { AllExceptionsFilter } from './core/all-exceptions-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerDocument = load(join(__dirname, '../doc/api.yaml'));
  SwaggerModule.setup('doc', app, swaggerDocument);
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(4000);
}
bootstrap();


process.on('uncaughtException', (error: Error) => {
  // logger.error(error.message);
  console.log('ololo-1');
  process.exit(1);
});
//
process.on('unhandledRejection', (reason: Error) => {
  // logger.error(reason.message);
  console.log('ololo-2');
  process.exit(1);
});

