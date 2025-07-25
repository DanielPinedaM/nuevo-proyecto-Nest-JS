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

      const logMessage: string =
        `🌐 [${method}] ${protocol}://${host}${originalUrl}` + // URL
        ` 🐱 https://http.cat/status/${statusCode}` +          // Link HTTP status
        ` 📄 ${statusMessage}` +                               // Descripción del estado
        ` ⌛ ${duration}ms`;                                   // Tiempo de respuesta

      let coloredMessage: string = '';
      if (statusCode >= 500) {
        coloredMessage = chalk.blue(logMessage);     // 5xx: Errores del servidor
      } else if (statusCode >= 400) {
        coloredMessage = chalk.red(logMessage);      // 4xx: Errores del cliente
      } else if (statusCode >= 300) {
        coloredMessage = chalk.yellow(logMessage);   // 3xx: Redirecciones
      } else if (statusCode >= 200) {
        coloredMessage = chalk.green(logMessage);    // 2xx: Peticiones correctas
      } else {
        coloredMessage = chalk.cyan(logMessage);     // 1xx: Respuestas informativas
      }

      if (statusCode >= 400) {
        console.error('❌ ', coloredMessage + '\n');
      } else {
        console.info('✅ ', coloredMessage + '\n');
      }
    });

    next();
  }
}
