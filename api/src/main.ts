import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './helpers/developmentEnv';
import morgan from 'morgan'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use(morgan())
  await app.listen(PORT ?? 3002);
}

bootstrap();
