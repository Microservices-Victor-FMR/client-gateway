import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('profile')
export class UserController {
  constructor(@Inject('NATS_SERVICE') private readonly nats_profile: ClientProxy) {}

  @Get()
  async getProfile() {
    try {
      const result = await firstValueFrom(this.nats_profile.send('findAllUser', {}));
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
