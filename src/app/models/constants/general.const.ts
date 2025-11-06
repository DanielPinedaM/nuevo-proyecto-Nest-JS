import { pino } from 'pino';

// swagger
export const apiTitle: string = 'Base';
export const apiDescription: string = 'Descripción de API para base';
export const apiVersion: string = '1';
export const baseApiTag: string = 'Base';
export const baseSuccess: string = 'Operación ejecutada correctamente';
export const baseError: string = 'Operación ejecutada incorrectamente';

// auth
export const authApiTag: string = 'Auth';
export const userApiTag: string = 'User';

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
