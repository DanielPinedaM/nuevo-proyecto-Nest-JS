import chalk from 'chalk';
import { Injectable, HttpException } from '@nestjs/common';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';
import { IRequestOptions } from '@/app/services/general-service/types/request-data.types';

@Injectable()
export class HttpService {
  private client: AxiosInstance;

  private methodsWithBody: string[] = ['PUT', 'POST', 'DELETE', 'PATCH'];

  constructor() {
    this.client = axios.create({ timeout: 15000 });
    this.setupInterceptors();
  }

  /*
   ***********************
   * Axios interceptor's *
   *********************** */
  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response: AxiosResponse<any, any>) => this.logResponseSuccess(response),
      (error: AxiosError) => this.logResponseError(error),
    );
  }

  /** logs de peticiones HTTP exitosas ✅  */
  private logResponseSuccess(response: AxiosResponse) {
    const { status } = response;
    const { method } = response.config;

    const fullUrl: string = this.buildFullUrl(response.config);

    const message: string = `✅ [${method?.toUpperCase()}] ${status} ${fullUrl}`;
    console.log(chalk.green(message));

    return response;
  }

  /** logs de peticiones HTTP erroneas ❌ */
  private logResponseError(error: AxiosError) {
    const { status } = error?.response;
    const { method } = error.config;

    const fullUrl: string = this.buildFullUrl(error.config);

    const message: string = `❌ [${method?.toUpperCase()}] ${status} ${fullUrl}`;
    console.log(chalk.red(message));

    return Promise.reject(error);
  }

  private buildFullUrl(config: AxiosRequestConfig): string {
    const base = config.baseURL ?? '';
    const path = config.url ?? '';
    const query = config.params
      ? `?${new URLSearchParams(config.params as any).toString()}`
      : '';
    return `${base}${path}${query}`;
  }

  /*
   ***************************
   * validar peticiones HTTP *
   *************************** */
  private async httpService<T = any>(
    method: string,
    url: string,
    options: IRequestOptions = {},
  ): Promise<T> {
    /**
    configuracion de Axios:
    https://axios-http.com/es/docs/req_config */
    const {
      body = undefined,
      queryParams = undefined,
      responseType = 'json',
    } = options;

    const config: AxiosRequestConfig = {
      url,
      method: method as Method,
      params: queryParams,
      data: body,
      responseType,
      withCredentials: true,
    };

    try {
      let response: AxiosResponse<T>;

      if (this.methodsWithBody.includes(method)) {
        response = await this.client.request<T>({
          ...config,
        });
      } else {
        const { data, ...rest } = config;
        response = await this.client.request<T>({ ...rest });
      }

      return response?.data;
    } catch (error: any) {
      throw new HttpException(
        error?.response?.data ?? 'Error en la petición HTTP',
        error?.response?.status ?? 500,
      );
    }
  }

  /*
   *********************************************************
   * funciones con metodos HTTP para llamar endpoint (API) *
   ********************************************************* */
  public async GET<T = any>(url: string, options: IRequestOptions = {}) {
    return this.httpService<T>('GET', url, options);
  }

  public async POST<T = any>(url: string, options: IRequestOptions = {}) {
    return this.httpService<T>('POST', url, options);
  }

  public async PUT<T = any>(url: string, options: IRequestOptions = {}) {
    return this.httpService<T>('PUT', url, options);
  }

  public async PATCH<T = any>(url: string, options: IRequestOptions = {}) {
    return this.httpService<T>('PATCH', url, options);
  }

  public async DELETE<T = any>(url: string, options: IRequestOptions = {}) {
    return this.httpService<T>('DELETE', url, options);
  }
}
