import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {RpcCustomExceptionFilter } from './common/exeption/rpc-exception.filter';

async function bootstrap() {
  const logger= new Logger('Main');
  const app = await NestFactory.create(AppModule,);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
     //transform: true
    
    }),
  );
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3300);
  app.useGlobalFilters(new RpcCustomExceptionFilter());
  
  await app.listen(port);
  logger.log(`Client-Gateway is running on port ${port}`);
}
bootstrap();


