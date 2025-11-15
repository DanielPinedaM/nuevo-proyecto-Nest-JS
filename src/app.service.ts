import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@/app/shared/services/http-general-service/http.service';
import { IResponse } from '@/app/shared/models/interface/response.interfaces';

@Injectable()
export class AppService {
  constructor(private readonly http: HttpService) {}

  async jsonPlaceHolder() {
    const response: IResponse = await this.http.GET(
      'https://jsonplaceholder.typicode.com/todos/1',
    );

    if (response.success) return response;

    throw new HttpException(response, response.status);
  }
}
