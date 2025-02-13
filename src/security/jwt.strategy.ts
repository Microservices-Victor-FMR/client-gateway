import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JsonWebTokenError } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private readonly configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    try {
      if (!payload || !payload.sub || !payload.email || !payload.role || !payload.username) {
  
        throw new UnauthorizedException('Invalid token o expirado');
      }
      
      return {
        userId: payload.sub,
        username: payload.username,
        email: payload.email,
        role: payload.role,
      };
    } catch (error) {
      if(error instanceof JsonWebTokenError){
        throw new RpcException(error)
     }
     throw error
    }
  }
}
