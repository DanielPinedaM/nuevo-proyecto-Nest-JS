import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import httpStatusMessages from '@/app/shared/models/constants/http-status-messages.const';
import { LoggerService } from '@/app/shared/services/logger.service';

interface IFinish {
  res: Response;
  start: number;
  method: string;
  originalUrl: string;
  protocol: string;
  host: string;
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start: number = Date.now();
    const { method, originalUrl, protocol } = req;
    const host: string = req.get('Host');

    res.on('finish', () => {
      this.#responseFinish({ res, start, method, originalUrl, protocol, host });
    });

    next();
  }

  #responseFinish({
    res,
    start,
    method,
    originalUrl,
    protocol,
    host,
  }: IFinish): void {
    const duration: number = Date.now() - start;
    const statusCode: number = res.statusCode;
    const statusMessage: string = httpStatusMessages[statusCode] ?? '';

    const logMessage: string =
      `[${method}] ${protocol}://${host}${originalUrl}` + // URL
      ` https://http.cat/status/${statusCode}` + // Link HTTP status
      ` ${statusMessage}` + // Descripción del estado
      ` ${duration}ms`; // Tiempo de respuesta

    const meta = { statusCode, statusMessage, method, originalUrl, duration };

    const isError: boolean = statusCode >= 400;

    if (isError) {
      this.loggerService.logError(logMessage, meta);
    } else {
      this.loggerService.logInfo(logMessage, meta);
    }
  }
}
