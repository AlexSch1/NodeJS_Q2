import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { load } from 'yamljs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerDocument = load(join(__dirname, '../doc/api.yaml'));

  SwaggerModule.setup('doc', app, swaggerDocument);

  await app.listen(3000);
}
bootstrap();
