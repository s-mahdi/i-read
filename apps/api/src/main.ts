import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';

import { AppModule } from './app/app.module';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '.env') });

const requiredVariables = [
  'DB_NAME',
  'DB_HOST',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_PORT',
  'JWT_SECRET',
  'HOST_ADDRESS',
  'PORT',
];

const missingVariables = requiredVariables.filter(
  (variable) => !(variable in process.env)
);

if (missingVariables.length > 0) {
  console.error(
    `Error: Required environment variables are missing: ${missingVariables.join(
      ', '
    )}`
  );
  process.exit(1);
}

async function bootstrap() {
  console.log('process.env.HOST_ADDRESS: ', process.env.HOST_ADDRESS);
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [process.env.HOST_ADDRESS],
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
