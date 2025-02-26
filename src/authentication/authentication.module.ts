import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { NatsModule } from 'src/transports/nats.module';
import { JwtStrategy } from 'src/security/jwt.strategy';
import { UserController } from './user.controller';

@Module({
  imports: [NatsModule],
  controllers: [AuthenticationController,UserController],
  providers: [JwtStrategy],
})
export class AuthenticationModule {}
