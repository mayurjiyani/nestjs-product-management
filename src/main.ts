import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PORT } from './frameworks/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // console.log(process.env.DATABASE_URL, process.env.PORT);
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  initializeSwagger(app);

  await app.listen(PORT);
  Logger.debug(`🚀  Server is listening on port ${PORT}`);
}

function initializeSwagger(app) {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('IAURO API')
    .setDescription('IAURO API')
    .setVersion('v1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
}

bootstrap().catch((e) => {
  Logger.error(`❌  Error starting server, ${e}`);
  throw e;
});
