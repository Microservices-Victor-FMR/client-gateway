import { Module } from '@nestjs/common';
import { ShippingAddressController } from './shipping-address.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [ShippingAddressController],
  providers: [],
})
export class ShippingAddressModule {}
