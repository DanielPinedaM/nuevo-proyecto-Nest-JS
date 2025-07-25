import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuccessResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext: HttpArgumentsHost = context.switchToHttp();
    const response = httpContext.getResponse();
    const status = response.statusCode;

    return next.handle().pipe(
      map((data) => ({
        success: true,
        status: status,
        message: 'Solicitud exitosa',
        data: data?.data ?? data,
      })),
    );
  }
}
