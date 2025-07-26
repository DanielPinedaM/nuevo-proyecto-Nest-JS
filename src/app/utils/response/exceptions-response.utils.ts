import httpStatusMessages from '@/app/models/constants/http-status-messages.constans';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

/**
Nest js - ExceptionFilter
devolver dentro de data cualquier tipo de dato

message tiene q ser string

error solamente puede ser el objeto error

si error es string y message es un string y ambos existen al mismo tiempo, entonces concatenar ambos string error + message y agregarlo solamente a la key message 

si solamente existe message tipo string entonces agregarlo a key message

si solamente existe error tipo string entonces agregar error a la key message

siempre para message y error cuando sean tipo string accederlos de forma segura con ?. optional chaining

siempre para message y error cuando sean tipo string usar operador coalesente nulo asi, esto es solo un ejemplo
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

la respuesta tiene q ser esta 
response.status(status).json({
      success: false, // esto esta quemado porque la respuesta es erronea
      status, // obtener numero de status
      statusText: httpStatusMessages[status] ?? '', // esto es un acceso a un objeto literal
      message, // siempre tipo string
      errorDescription: {
        timestamp: new Date().toISOString(),
        path: request.url,
        error, // siempre objeto error
      },
      data, // cualquier dato
    }); */

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status: number =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse: string | object =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal server error', error: 'Unknown Error' };

    const error =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : ((exceptionResponse as any)?.error?.error ??
          (exceptionResponse as any)?.error ??
          null);

    // obtener data
    const data =
      (exceptionResponse as any)?.data ??
      (exceptionResponse as any)?.data?.data ??
      [];

    // obtener mensaje
    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : ((exceptionResponse as any)?.message ??
          (exceptionResponse as any)?.msg ??
          (exceptionResponse as any)?.mensaje ??
          'Internal server error');

    response.status(status).json({
      success: false,
      status,
      statusText: httpStatusMessages[status] ?? '',
      message,
      error,
      errorDescription: {
        timestamp: new Date().toISOString(),
        path: request.url,
      },
      data,
    });
  }
}
