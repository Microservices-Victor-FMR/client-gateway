import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcCustomExceptionFilter } from './common/exeption/rpc-exception.filter';

async function bootstrap() {
  const ENV = process.env.NODE_ENV || 'development';
  const consoleLogger = new Logger('Main', { timestamp: true });

  consoleLogger.log(`El Gateway está corriendo en modo ${ENV}`);

  const app = await NestFactory.create(AppModule);
  app.useLogger(ENV === 'development' ? ['debug','verbose','error','warn','log']: ['log','warn','error'])
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new RpcCustomExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 15000);
  consoleLogger.log(`CLIENT GATEWAY is running on port ${port}`);
  await app.listen(port);
}

bootstrap();
