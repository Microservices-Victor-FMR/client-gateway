import { Module } from '@nestjs/common';

import { InventoryController } from './inventory.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports:[ NatsModule],
  controllers: [InventoryController],
  providers: [],
})
export class InventoryModule {}
