import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import httpStatusMessages from '@/app/models/constants/http-status-messages.const';
import { log } from '@/app/models/constants/general.const';

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
      `[${method}] ${protocol}://${host}${originalUrl}` +  // URL
      ` https://http.cat/status/${statusCode}` +           // Link HTTP status
      ` ${statusMessage}` +                                // Descripción del estado
      ` ${duration}ms`;                                    // Tiempo de respuesta

    const isError: boolean = statusCode >= 400;

    if (isError) {
      log.error(`\x1b[31m ${logMessage}\x1b[0m`);
    } else {
      log.info(`\x1b[32m ${logMessage}\x1b[0m`);
    }
  }
}
