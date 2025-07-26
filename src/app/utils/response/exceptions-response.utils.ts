/**
Nest js - typescript - ExceptionFilter
devolver dentro de data cualquier tipo de dato

message tiene q ser string

error siempre tiene q estar en la key error, separada, sin importar sin importar si es objeto o string

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

siempre dar prioridad al status q devuelve el exception de nest

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
        error, // es objeto o string
      },
      data, // cualquier dato
    });


muestrame las excepciones mas usadas y como responde con el interceptor

con el interceptor anterior dame ejemplo de esto: solamente concatenar error + message cuando se defina manualmente la key error */
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

    // 1. Status
    const baseStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 2. Raw initial payload de la excepción
    const initialRaw: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal server error', error: 'Unknown Error' };

    const status =
      baseStatus ??
      initialRaw?.status ??
      initialRaw?.statusCode ??
      HttpStatus.INTERNAL_SERVER_ERROR;

    // 3. ErrorObj (siempre objeto)
    let errorObj: object | string = {};
    const e1 = initialRaw?.error;
    const e2 = initialRaw?.err;

    if (typeof e1 === 'object' && e1 !== null) {
      const { message, msg, mensaje, ...rest } = e1;
      errorObj = rest;
    } else if (typeof e2 === 'object' && e2 !== null) {
      const { message, msg, mensaje, ...rest } = e2;
      errorObj = rest;
    } else if (typeof e1 === 'string') {
      errorObj = e1;
    } else if (typeof e2 === 'string') {
      errorObj = e2;
    } else {
      errorObj = {};
    }

    // 4. Raw for detecting nesting: viene de errorObj si tiene datos, sino initialRaw
    const raw: any = Object.keys(errorObj)?.length > 0 ? errorObj : initialRaw;

    // 5. Data (puede ser cualquier tipo)
    let data: any;
    if (typeof raw === 'object' && raw !== null) {
      data = raw.data ?? raw.payload ?? [];
    } else {
      data = [];
    }

    // 6. Message (siempre string) + concatenar error en todos los casos
    let message: string;
    const m1 = raw?.message;
    const m2 = raw?.msg;
    const m3 = raw?.mensaje;
    const errStr =
      typeof initialRaw?.error === 'string' ? initialRaw.error : '';

    const isManualError = typeof initialRaw?.error === 'string';

    if (typeof m1 === 'string') {
      message = isManualError ? `${initialRaw.error} ${m1}` : m1;
    } else if (typeof m2 === 'string') {
      message = isManualError ? `${initialRaw.error} ${m2}` : m2;
    } else if (typeof m3 === 'string') {
      message = isManualError ? `${initialRaw.error} ${m3}` : m3;
    } else if (isManualError) {
      message = initialRaw.error;
    } else {
      message = 'Internal server error';
    }

    response.status(status).json({
      success: false,
      status,
      statusText: httpStatusMessages[status] ?? '',
      message,
      data,
      description: {
        timestamp: new Date().toISOString(),
        path: request.url,
        error: errorObj,
      },
    });
  }
}
