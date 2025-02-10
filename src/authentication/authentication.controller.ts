import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
  Req,
  HttpCode,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RegisterDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login-auth.dto';
import { LocalAuthGuard } from 'src/guards/autenticación-local.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthenticationController {
  constructor(@Inject('NATS_SERVICE') private readonly nats_authentication: ClientProxy) {}

  @Post('register')
  async create(@Body() registerDto: RegisterDto) {
    try {
      const result = await firstValueFrom(
        this.nats_authentication.send('register', registerDto),
      );

      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }


  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async login(@Req() req:Request) {
    try {
      const user= req.user
      const result =  await firstValueFrom(
        this.nats_authentication.send('login',user),
      );
      return result;
    } catch (error) {
      throw new RpcException(error)
    }
  
  }

}
