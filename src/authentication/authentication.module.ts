import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { NatsModule } from 'src/transports/nats.module';
import { JwtStrategy } from 'src/security/jwt.strategy';

@Module({
  imports: [NatsModule],
  controllers: [AuthenticationController],
  providers: [JwtStrategy],
})
export class AuthenticationModule {}
