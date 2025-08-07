/**
Nest js - typescript - ExceptionFilter
devolver dentro de data cualquier tipo de dato

message tiene q ser string

error siempre tiene q estar en la key error, separada, sin importar sin importar su tipo

solamente concatenar error + message cuando se defina manualmente la key error

si solamente existe message tipo string entonces agregarlo a key message

siempre para message y error accederlos de forma segura con ?. optional chaining

siempre para message y error usar operador coalesente nulo asi, esto es solo un ejemplo
   const message =
          newData?.mensaje ??
          newData?.message ??
          newData?.msg ??
          'Internal server error'

lo mismo para error
   const message =
          newData?.error ??
          newData?.err ??
          AQUI VA EL OBJETO ERROR

NO usar ternarias anidadas, ni switch case, siempre usar if else con let para los condicionales

error, message y data son keys totalmente a parte, son diferentes

no quiero q  dentro de la key error.message este lo mismo q en message, los message solamente van en message 

hacer q los status code correspondan a los de las excepciones de next,
no quiero q las excepciones de nest me den un status y q  despues defina otro status manualmente y se reemplace en objeto,

controlar con optional chaining y operador coalesente nulo el acceso a status asi, ejemplo

   const status =
          newData?.status ??
          newData?.statusCode ??
          AQUI VA EL STATUS REAL DEL EXCEPTION DE NEST

siempre dar prioridad al status q devuelve el exception de nest y detectar otros status

mucho cuidado, los status tienen q coincidir, la key de status en este interceptor y la q se muestra en navegador inspecionar elemento tienen q ser las mismas

Ejemplo
✔️ Si usas throw new BadRequestException() → status será 400.
❌ Si usas throw new Error() o throw { message: '...' } → no hay status definido → usas 500 por defecto.

la respuesta tiene q ser esta 
response.status(status).json({
      success: false, // esto esta quemado porque la respuesta es erronea
      status, // obtener numero de status
      statusText: httpStatusMessages[status] ?? '', // esto es un acceso a un objeto literal
      message, // siempre tipo string
      errorDescription: {
        timestamp: new Date().toISOString(),
        path: request.url,
        error, // es objeto o array
      },
      data, // cualquier tipo de dato
    });


muestrame las excepciones mas usadas y como responde con el interceptor

con el interceptor anterior dame ejemplo de esto:
solamente concatenar error + message cuando se defina manualmente la key error */

import { DateTime } from 'luxon';
import httpStatusMessages from '@/app/models/constants/http-status-messages.constans';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // Convertimos con assertion en lugar de tipo genérico
    const response = ctx.getResponse() as ExpressResponse;
    const request = ctx.getRequest() as ExpressRequest;

    // Status
    const baseStatus: number =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Raw initial payload de la excepción
    const initialRaw: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal server error', error: 'Unknown Error' };

    const status =
      baseStatus ??
      initialRaw?.status ??
      initialRaw?.statusCode ??
      initialRaw?.code ??
      initialRaw?.httpCode ??
      initialRaw?.httpStatusCode ??
      initialRaw?.httpStatus ??
      initialRaw?.estado ??
      initialRaw?.codigo ??
      initialRaw?.codigoEstado ??
      initialRaw?.codigoHttp ??
      HttpStatus.INTERNAL_SERVER_ERROR;

    // ErrorObjArray siempre es objeto literal {} o array []
    let errorObjArray: object | any[] = {};
    const rawError = initialRaw?.error ?? initialRaw?.err;
    if (
      (typeof rawError === 'object' && rawError !== null) ||
      Array.isArray(rawError)
    ) {
      errorObjArray = rawError;
    } else {
      errorObjArray = {};
    }

    // Data puede ser cualquier tipo
    let data: any;
    const raw = initialRaw;
    if (typeof raw === 'object' && raw !== null) {
      data =
        raw?.data?.data ??
        raw?.data ??
        raw?.datos?.datos ??
        raw?.datos ??
        raw?.payload ??
        [];
    } else {
      data = [];
    }

    // Message (siempre string) + concatenar con error solamente cuando error sea tipo string
    // hacer q los string de message y error NO se repitan
    let message: string = '';

    const m1 = raw?.message;
    const m2 = raw?.msg;
    const m3 = raw?.mensaje;

    const error = typeof raw?.error === 'string' ? raw.error.trim() : '';
    const isManualError: boolean = error !== '';

    let baseMessage = '';
    if (typeof m1 === 'string') {
      baseMessage = m1.trim();
    } else if (typeof m2 === 'string') {
      baseMessage = m2.trim();
    } else if (typeof m3 === 'string') {
      baseMessage = m3.trim();
    } else {
      baseMessage = '';
    }

    if (isManualError && baseMessage && !baseMessage?.includes(error)) {
      message = `${error} ${baseMessage}`;
    } else if (baseMessage) {
      message = baseMessage;
    } else if (isManualError) {
      message = error;
    } else {
      message = '';
    }

    response.status(status).json({
      success: false,
      status,
      statusText: httpStatusMessages[status] ?? '',
      message,
      data,

      description: {
        error: errorObjArray,

        requestInfo: {
          method: request.method,
          contentType: request.headers['content-type'],
          userAgent: request.headers['user-agent'],
          timestamp: DateTime.now()
            .setLocale('es')
            .toFormat(
              "cccc, dd 'de' LLLL 'de' yyyy hh:mm:ss.SSS a ZZZZ 'UTC' Z",
            ),
        },

        networkInfo: {
          ip: request.ip,
          fullEndpointUrl: `${request.protocol}://${request?.get('host') ?? request?.hostname}${request.originalUrl}`,
          path: request.url,
          hostname: request.hostname,
        },
      },
    });
  }
}
