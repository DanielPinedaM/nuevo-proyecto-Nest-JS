import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, protocol } = req;

    const host: string = req.get('Host');

    const start: number = Date.now();

    res.on('finish', () => {
      const statusCode: number = res.statusCode;
      const duration: number = Date.now() - start;
      const logMessage: string = `[${method}] ${protocol}://${host}${originalUrl} - status ${statusCode} - ⌛ ${duration}ms`;

      if (statusCode >= 400) {
        console.error('❌ ', logMessage);
      } else {
        console.info('✅ ', logMessage);
      }
    });

    next();
  }
}
