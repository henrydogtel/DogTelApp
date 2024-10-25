import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {  PORT } from './helpers/developmentEnv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(PORT ?? 3001);
}

bootstrap();
