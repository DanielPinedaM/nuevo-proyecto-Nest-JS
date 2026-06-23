import { ResponseType } from 'axios';
import { TQueryParams } from '@/shared/services/api/http-client/data-types/types/gateway.type';

/**
parametros para llamar a la API
del metodo executeRequest q esta en la clase ApiGatewayService */
export interface IRequestOptions<T = any> {
  body?: T;
  params?: TQueryParams;
  responseType?: ResponseType;
  withCredentials?: boolean;
}
