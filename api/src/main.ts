import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './helpers/developmentEnv';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  await app.listen(PORT ?? 3000);
}
bootstrap();

