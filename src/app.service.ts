import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@/app/services/general-service/http.service';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async jsonPlaceHolder() {
    try {
      const data = await this.httpService.GET(
        'https://jsonplaceholder.typicode.com/todos/1',
      );

      return {
        message: 'solicitud exitosa a json placeholder 333',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error al consumir JSON Placeholder',
        error,
      });
    }
  }
}
