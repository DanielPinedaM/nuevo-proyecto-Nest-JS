import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggerService } from '@/app/shared/services/logger.service';
import httpStatusMessages from '@/app/shared/models/constants/http-status-messages.const';

@Injectable()
export class SuccessLogsInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now: number = Date.now();

    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const { method, originalUrl, protocol } = req;
    const host: string = req.get('Host');

    return next.handle().pipe(
      tap(() => {
        const duration: number = Date.now() - now;
        const statusCode: number = res.statusCode;

        // solo admitir logs exitosos
        if (statusCode >= 400) return;

        const statusMessage: string = httpStatusMessages[statusCode] ?? '';

        const fullURL: string = `${protocol}://${host}${originalUrl}`;

        const logMessage: string =
          `[${method.toUpperCase()}]` +
          ` ${statusCode}` +
          ` ${fullURL}` +
          ` ${statusMessage}` +
          ` ${duration}ms`; // tiempo de respuesta

        const meta = {
          statusCode,
          statusMessage,
          method,
          originalUrl,
          duration,
        };

        this.loggerService.logInfo(logMessage, meta);
      }),
    );
  }
}
