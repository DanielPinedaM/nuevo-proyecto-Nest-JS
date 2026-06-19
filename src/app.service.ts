import { HttpException, Injectable } from '@nestjs/common';
import { ApiGatewayService } from '@/shared/services/api/http-client/http-gateway-axios.api';
import { IResponse } from '@/shared/data-types/interface/response.interfaces';

@Injectable()
export class AppService {
  constructor(private readonly http: ApiGatewayService) {}

  async jsonPlaceHolder() {
    const response: IResponse = await this.http.GET(
      'https://jsonplaceholder.typicode.com/todos/1',
    );

    if (response.success) return response;

    throw new HttpException(response, response.status);
  }
}
