import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [AuthenticationController],
  providers: [],
})
export class AuthenticationModule {}
