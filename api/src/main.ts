import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './helpers/developmentEnv';
import {DocumentBuilder,SwaggerModule} from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerOptions = new DocumentBuilder()
    .setTitle('NestJS Api Dogtel')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app,swaggerOptions)
  SwaggerModule.setup('api',app,document)
  await app.listen(PORT ?? 3000);
}

bootstrap();
