import chalk from 'chalk';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start: number = Date.now();
    const { method, originalUrl, protocol } = req;
    const host: string = req.get('Host');

    res.on('finish', () => {
      const duration: number = Date.now() - start;
      const statusCode: number = res.statusCode;
      const statusMessage: string = httpStatusMessages[statusCode] ?? '';
      const logMessage: string = `[${method}] ${protocol}://${host}${originalUrl} - https://http.cat/status/${statusCode} ${statusMessage} - ⌛ ${duration}ms`;

      let coloredMessage: string = '';
      if (statusCode >= 500) {
        coloredMessage = chalk.blue(logMessage);
      } else if (statusCode >= 400) {
        coloredMessage = chalk.red(logMessage);
      } else if (statusCode >= 300) {
        coloredMessage = chalk.yellow(logMessage);
      } else {
        coloredMessage = chalk.green(logMessage);
      }

      if (statusCode >= 400) {
        console.error('❌ ', coloredMessage);
      } else {
        console.info('✅ ', coloredMessage);
      }
    });

    next();
  }
}
