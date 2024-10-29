import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JWT_SECRET, PORT } from './helpers/developmentEnv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(PORT ?? 3001);
}

bootstrap();
