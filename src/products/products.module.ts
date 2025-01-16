import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'MARIA',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('PRODUCTS_MICROSERVICE_HOST'),
            port: configService.get<number>('PRODUCTS_MICROSERVICE_PORT'),
          },
        }),
      },
    ]),
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
