import { pino } from 'pino';

// swagger
export const apiTitle: string = 'Base';
export const apiDescription: string = 'Descripción de API para base';
export const apiVersion: string = '1';

// logger
export const log = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
      messageFormat: '{msg}',
    },
  },
});
