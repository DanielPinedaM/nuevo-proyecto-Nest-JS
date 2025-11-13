import { log } from '@/app/shared/models/constants/logger.const';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookies = request.cookies;
    const token = cookies.token;

    if (!token) {
      log.error('no se encontró el token de acceso en las cookies');

      throw new HttpException(
        'No tienes una sesión activa. Inicia sesión para continuar.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const payload = this.jwtService.verify(token);

      if (!payload) {
        log.error('el token de autenticación no es válido o ha expirado');

        throw new HttpException(
          'El token de autenticación no es válido o ha expirado.',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      log.error('error al verificar el token');
      log.error(error);

      throw new HttpException(
        'No se pudo verificar la sesión. Es posible que el token haya expirado o sea inválido',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return true;
  }
}
