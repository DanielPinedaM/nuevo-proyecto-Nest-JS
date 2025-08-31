import { Injectable, HttpException } from '@nestjs/common';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
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
  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig<any>) => {
        console.log(
          `➡️ ${config.method?.toUpperCase()} ${config.url}`,
          config?.data ?? config?.params,
        );

        return config;
      },
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse<any, any>) => this.logResponseSuccess(response),
      (error: AxiosError) => this.logResponseError(error),
    );
  }

  /** logs de peticiones HTTP exitosas ✅  */
  private logResponseSuccess(response: AxiosResponse) {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  }

  /** logs de peticiones HTTP erroneas ❌ */
  private logResponseError(error: AxiosError) {
    console.error(
      `❌ ${error.config?.url}`,
      error?.response?.data ?? error?.message,
    );
    return Promise.reject(error);
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
