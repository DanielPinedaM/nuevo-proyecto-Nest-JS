import { ResponseType } from 'axios';

/**
type de query params */
type TQueryParams = Record<
  string,
  string | number | boolean | (string | number | boolean)[]
>;

/**
parametros de funcion httpService para llamar a la API */
export interface IRequestOptions<T = any> {
  body?: T;
  queryParams?: TQueryParams;
  responseType?: ResponseType;
  withCredentials?: boolean;
}
