import { ResponseType } from 'axios';

/**
type de query params */
type TQueryParams = Record<
  string,
  string | number | boolean | (string | number | boolean)[]
>;

/**
parametros para llamar a la API 
del metodo executeRequest q esta en la clase ApiGatewayService */
export interface IRequestOptions<T = any> {
  body?: T;
  params?: TQueryParams;
  responseType?: ResponseType;
  withCredentials?: boolean;
}
