import { Controller, Get, Inject, Param, Post, Patch, Body } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { FindByIdDto } from './dto/findById-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Patch(':id')
  async updateProfile(@Param() id: FindByIdDto, @Body() updateUserDto: UpdateUserDto) {
    try {
      const result = await firstValueFrom(this.nats_profile.send('updateUser', { id, updateUserDto }));
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('changed-email/:token')
  async changedEmailToken(@Param('token') token: string) {
    try {
      const result = await firstValueFrom(this.nats_profile.send('changedEmailToken', { token }));
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
