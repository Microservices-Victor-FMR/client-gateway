import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from 'env.config';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { EnvironmentConfigModule } from './.env/environment.module';
import { NatsModule } from './transports/nats.module';
import { InventoryModule } from './inventory/inventory.module';
import { ShippingAddressModule } from './shipping-address/shipping-address.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      isGlobal: true,
      validationSchema: envSchema,
    }),
    EnvironmentConfigModule, 
    ProductsModule,
    OrdersModule,
    NatsModule,
    InventoryModule,
    ShippingAddressModule,
  ],
})
export class AppModule {}
