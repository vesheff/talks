import { ConfigService } from './config/config.service';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.use(cors());
  app.useStaticAssets({ root: join(__dirname, '..', 'public') });

  await app.listen(app.get(ConfigService).port);
}

bootstrap();
