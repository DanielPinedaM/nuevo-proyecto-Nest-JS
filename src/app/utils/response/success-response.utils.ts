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
        const newData: any =
          data?.data?.data ??
          data?.data ??
          data?.datos?.datos ??
          data?.datos ??
          data?.dato?.dato ??
          data?.dato ??
          data?.result?.result ??
          data?.result ??
          data?.results?.results ??
          data?.results ??
          data?.payload?.payload ??
          data?.payload ??
          data?.respuesta?.respuesta ??
          data?.respuesta ??
          data?.respuestas?.respuestas ??
          data?.respuestas ??
          data?.response?.response ??
          data?.response ??
          data?.responses?.responses ??
          data?.responses ??
          data?.content?.content ??
          data?.content ??
          data?.contenido?.contenido ??
          data?.contenido ??
          data?.value?.value ??
          data?.value ??
          data?.valor?.valor ??
          data?.valor ??
          data;

        // responder directo con tipo archivo
        if (isFile) return newData;

        // paginacion
        const pagination =
          newData?.pagination ?? newData?.paginacion ?? undefined;
        const resultData = pagination ? newData.items : newData;

        // obtener http status
        const status = response.statusCode;

        // obtener mensaje
        const message =
          newData?.mensaje ??
          newData?.message ??
          newData?.msg ??
          newData?.mensajeUsuario ??
          newData?.mensajeExito ??
          newData?.mensajeError ??
          newData?.descripcion ??
          newData?.descripcionError ??
          newData?.detalle ??
          newData?.detalles ??
          newData?.texto ??
          newData?.textoError ??
          newData?.userMessage ??
          newData?.successMessage ??
          newData?.errorMessage ??
          newData?.description ??
          newData?.errorDescription ??
          newData?.detail ??
          newData?.details ??
          newData?.text ??
          newData?.errorText ??
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
