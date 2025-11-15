import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import httpStatusMessages from '@/app/shared/models/constants/http-status-messages.const';
import { LoggerService } from '@/app/shared/services/logger.service';

@Catch()
export class ErrorLogsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();

    this.#logError(exception, req);
  }

  #logError(exception: any, req: any): void {
    const statusCode: number =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const statusMessage: string = httpStatusMessages[statusCode] ?? '';

    const { method, originalUrl, protocol } = req;
    const hostHeader: string = req.get('Host');

    const fullURL: string = `${protocol}://${hostHeader}${originalUrl}`;

    const logMessage: string =
      `[${method.toUpperCase()}]` +
      ` ${statusCode}` +
      ` ${fullURL}` +
      ` ${statusMessage}`;

    const meta = {
      statusCode,
      statusMessage,
      method,
      originalUrl,
    };

    this.logger.logError(logMessage, meta);
  }
}
