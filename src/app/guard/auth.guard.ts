import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser } from '@/app/models/interface/request-with-user.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger(AuthGuard.name);
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestWithUser = context.switchToHttp().getRequest();
    const cookies = request.cookies;
    const access_token = cookies.access_token;

    if (!access_token) {
      this.logger.warn('No se encontró el token de acceso en las cookies');
      throw new HttpException(
        'No tienes una sesión activa. Inicia sesión para continuar.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      // Verify the access token
      const payload = this.jwtService.verify(access_token);
      // Check if the token is valid
      if (!payload) {
        this.logger.warn(
          'El token de autenticación no es válido o ha expirado',
        );

        throw new HttpException(
          'El token de autenticación no es válido o ha expirado.',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      this.logger.error(`Error al verificar el token: ${error.message}`);
      throw new HttpException(
        'No se pudo verificar la sesión. Es posible que el token haya expirado o sea inválido.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return true;
  }
}
