/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  await app.init(); 
}
bootstrap();