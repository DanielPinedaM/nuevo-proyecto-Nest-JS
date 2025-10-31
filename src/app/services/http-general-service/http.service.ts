import chalk from 'chalk';
import { Injectable, Logger } from '@nestjs/common';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';
import { IRequestOptions } from '@/app/services/http-general-service/types/request-data.types';
import { IResponse } from '@/app/models/interface/response.interfaces';
import httpStatusMessages from '@/app/models/constants/http-status-messages.constans';

@Injectable()
export class HttpService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({ timeout: 15000 });
    this.#setupInterceptors();
  }

  /*
   ***********************
   * Axios interceptor's *
   *********************** */
  #setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response: AxiosResponse<any, any>) => this.#logResponseSuccess(response),
      (error: AxiosError) => this.#logResponseError(error),
    );
  }

  /** logs de peticiones HTTP exitosas ✅  */
  #logResponseSuccess(response: AxiosResponse) {
    const { status } = response;
    const { method } = response.config;

    const fullUrl: string = this.#buildFullUrl(response.config);

    const message: string = `✅ [${method?.toUpperCase()}] ${status} ${fullUrl}`;
    Logger.log(chalk.green(message));

    return response;
  }

  /** logs de peticiones HTTP erroneas ❌ */
  #logResponseError(error: AxiosError) {
    const status: number = error?.response?.status ?? 500;
    const method: string = (
      error?.config?.method ??
      error?.request?.method ??
      ''
    ).toUpperCase();
    const fullUrl: string = this.#buildFullUrl(error?.config ?? {});

    const message: string = `❌ [${method}] ${status} ${fullUrl}`;
    Logger.error(chalk.red(message));

    return Promise.reject(error);
  }

  #buildFullUrl(config: AxiosRequestConfig): string {
    const path: string = config?.url ?? '';
    const query: string = config?.params
      ? `?${new URLSearchParams(config.params as any).toString()}`
      : '';
    return `${path}${query}`;
  }

  /*
   ***************************
   * validar peticiones HTTP *
   *************************** */
  async #executeRequest<T = any>(
    method: string,
    url: string,
    options: IRequestOptions = {},
  ): Promise<IResponse<T>> {
    /**
    configuracion de Axios:
    https://axios-http.com/es/docs/req_config */
    const {
      body = undefined,
      params = undefined,
      responseType = 'json',
      withCredentials,
    } = options;

    const config: AxiosRequestConfig = {
      url,
      method: method as Method,
      data: body,
      params,
      responseType,
      withCredentials,
    };

    try {
      const { data, ...rest } = config;
      const requestOptions = method === 'GET' ? { ...rest } : { ...config };
      const axiosResponse: AxiosResponse<T> = await this.client.request<T>(requestOptions);

      const { status, data: responseData } = axiosResponse;

      const standardResponse: IResponse<T> = {
        success: true,
        status,
        statusText: httpStatusMessages[status] ?? '',
        message: 'Petición HTTP exitosa',
        data: responseData,
      };

      return standardResponse;
    } catch (error: any) {
      const status: number = error?.response?.status ?? 500;

      const standardResponse: IResponse<T> = {
        success: false,
        status,
        statusText: httpStatusMessages[status],
        message: error?.response?.data?.message ?? 'Error en petición HTTP',
        data: error?.response?.data ?? null,
      };

      return standardResponse;
    }
  }

  /*
   *********************************************************
   * funciones con metodos HTTP para llamar endpoint (API) *
   ********************************************************* */
  async GET<T = any>(
    url: string,
    options: IRequestOptions = {},
  ): Promise<IResponse<T>> {
    return this.#executeRequest<T>('GET', url, options);
  }

  async POST<T = any>(
    url: string,
    options: IRequestOptions = {},
  ): Promise<IResponse<T>> {
    return this.#executeRequest<T>('POST', url, options);
  }

  async PUT<T = any>(
    url: string,
    options: IRequestOptions = {},
  ): Promise<IResponse<T>> {
    return this.#executeRequest<T>('PUT', url, options);
  }

  async PATCH<T = any>(
    url: string,
    options: IRequestOptions = {},
  ): Promise<IResponse<T>> {
    return this.#executeRequest<T>('PATCH', url, options);
  }

  async DELETE<T = any>(
    url: string,
    options: IRequestOptions = {},
  ): Promise<IResponse<T>> {
    return this.#executeRequest<T>('DELETE', url, options);
  }
}
