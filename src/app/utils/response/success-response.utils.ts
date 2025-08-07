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
        let newData: any = this.searchData(data);

        // responder directo con tipo archivo
        if (isFile) return newData;

        newData = this.clearData(newData);

        // paginacion
        const pagination = this.searchPagination(newData);
        const resultData = pagination ? newData?.items : newData;

        // obtener http status
        const status =
          newData?.status ?? newData?.statusCode ?? response?.statusCode ?? 200;

        // obtener mensaje
        const message =
          this.searchMessage(data) ??
          this.searchMessage(newData) ??
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

  private searchData(data: any): any {
    return (
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
      data
    );
  }

  private searchPagination(data: any): any {
    return data?.pagination ?? data?.paginacion ?? data?.paginador ?? undefined;
  }

  private searchMessage(data: any): any {
    return (
      data?.mensaje ??
      data?.message ??
      data?.msg ??
      data?.mensajeUsuario ??
      data?.mensajeExito ??
      data?.mensajeError ??
      data?.descripcion ??
      data?.descripcionError ??
      data?.detalle ??
      data?.detalles ??
      data?.texto ??
      data?.textoError ??
      data?.userMessage ??
      data?.successMessage ??
      data?.errorMessage ??
      data?.description ??
      data?.errorDescription ??
      data?.detail ??
      data?.details ??
      data?.text ??
      data?.texto ??
      data?.errorText ??
      undefined
    );
  }

  private clearData(data: any): any {
    if (data === null || typeof data !== 'object') return data;

    const keysToDelete = ['status', 'statusCode', 'mensaje', 'message'];

    const clone: any = structuredClone(data);

    keysToDelete.forEach((key: string) => {
      if (Object.prototype.hasOwnProperty.call(clone, key)) {
        delete clone[key];
      }
    });

    return clone;
  }
}
