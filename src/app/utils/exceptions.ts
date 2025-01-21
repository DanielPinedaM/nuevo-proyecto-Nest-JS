import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as any) 
        : { message: 'Internal server error', error: 'Unknown Error' };

    response.status(status).json({
      success: false,
      status: status,
      message: message.message || 'Internal server error',
      data: {
        timestamp: new Date().toISOString(),
        path: request.url,
        error: message.error || null,
      },
    });
  }
}
