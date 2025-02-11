import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from 'env.config';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { EnvironmentConfigModule } from './.env/environment.module';
import { NatsModule } from './transports/nats.module';
import { InventoryModule } from './inventory/inventory.module';
import { ShippingAddressModule } from './shipping-address/shipping-address.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { LocalStrategy } from './security/local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      isGlobal: true,
      validationSchema: envSchema,
    }),
    PassportModule,
    EnvironmentConfigModule, 
    ProductsModule,
    OrdersModule,
    NatsModule,
    InventoryModule,
    ShippingAddressModule,
    AuthenticationModule,
  ],
  providers: [LocalStrategy],
})
export class AppModule {}
