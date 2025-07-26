import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import httpStatusMessages from '@/app/models/constants/http-status-messages.constans';
import { IResponse } from '@/app/models/interface/response.interfaces';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    const ctx: HttpArgumentsHost = context.switchToHttp();
    const response = ctx.getResponse();
    const isFile = response.getHeader('Content-Disposition');

    return next.handle().pipe(
      map((data: any) => {
        // obtener data
        const newData = data?.data ?? data;

        // responder directo con tipo archivo
        if (isFile) return newData;

        // paginacion
        const pagination = newData?.pagination ?? undefined;
        const resultData = pagination ? newData.items : newData;

        // obtener http status
        const status = response.statusCode;

        // obtener mensaje
        const message =
          newData?.mensaje ??
          newData?.message ??
          newData?.msg ??
          'Operación exitosa';

        return {
          success: true,
          status,
          statusText: httpStatusMessages[status] ?? '',
          message,
          data: resultData,
          ...(pagination && { pagination }),
        };
      }),
    );
  }
}
