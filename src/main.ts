import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const bodyparser = require('body-parser')

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  app.use(bodyparser.urlencoded({ extended: false }));
  await app.listen(5000);
}
bootstrap();