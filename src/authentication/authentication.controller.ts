import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, Req, HttpCode, Query, HttpStatus, HttpException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RegisterDto } from './dto/register-user.dto';
import { LocalAuthGuard } from 'src/guards/autenticación-local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Logger } from '@nestjs/common';

@Controller('auth')
export class AuthenticationController {
  constructor(@Inject('NATS_SERVICE') private readonly nats_authentication: ClientProxy) {}

  private readonly logger = new Logger(AuthenticationController.name);

  @Post('register')
  async create(@Body() registerDto: RegisterDto) {
    try {
      const result = await firstValueFrom(this.nats_authentication.send('register', registerDto));
      const message = result['message'] || 'Usuario registrado con éxito';
      this.logger.log(`Registro exitoso para ${registerDto.email}: ${message}`);
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async login(@Req() req: Request) {
    try {
      const user = req.user;
      const result = await firstValueFrom(this.nats_authentication.send('login', user));
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async logout(@Req() req: Request) {
    try {
      const result = await firstValueFrom(this.nats_authentication.send('logout', {}));
      const data = result['message'];
      this.logger.debug(data);
      this.logger.log(data || 'Cierre de sesión exitoso');
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('verify-account')
  @HttpCode(200)
  async veriryAccount(@Query('token') token: string) {
    try {
      const result = await firstValueFrom(this.nats_authentication.send('verify-account', token));
      const data = result['message'];
      this.logger.log(data || 'Verificación de cuenta exitosa');
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('resend-verification')
  @HttpCode(200)
  async resendVerificationToken(@Body('email') email: string) {
    try {
      const result = await firstValueFrom(this.nats_authentication.send('resend-verification', email));
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
