import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { FindByIdDto } from './dto/findById-user.dto';

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

  @Get(':id')
  async getProfileId(@Param() id: FindByIdDto) {
    try {
      const result = await firstValueFrom(this.nats_profile.send('findOneUser', id));
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
