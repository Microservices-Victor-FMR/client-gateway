import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
  
        this.logger.warn('Invalid token o expirado');
        throw new UnauthorizedException('Invalid token o expirado');
      }
      
      this.logger.debug(payload.sub,payload.username, payload.role);
      return {
        userId: payload.sub,
        username: payload.username,
        email: payload.email,
        role: payload.role,
      };
    } catch (error) {
      this.logger.error('JWT validation failed', error.stack);
      throw error;
    }
  }
}
