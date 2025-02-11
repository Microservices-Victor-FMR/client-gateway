import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.headers.authorization) {
      this.logger.error('No se encontró el token de autorización');
      throw new UnauthorizedException(
        'No se encontró el token de autorización',
      );
    }

    this.logger.log('Token encontrado, permitiendo la activación');
    return super.canActivate(context);
  }
}
