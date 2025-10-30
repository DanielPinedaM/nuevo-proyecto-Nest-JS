import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@/app/services/http-general-service/http.service';

@Injectable()
export class AppService {
  constructor(private readonly http: HttpService) {}

  async jsonPlaceHolder() {
    const response = await this.http.GET(
      'https://jsonplaceholder.typicode.com/todos/1',
    );
    console.log("🚀 ~ AppService ~ jsonPlaceHolder ~ response:", response)

    //return {
    //  message: 'solicitud exitosa a json placeholder 333',
    //  data,
    //};

    /* 
      throw new InternalServerErrorException({
        message: 'Error al consumir JSON Placeholder',
        error,
      });
    */
  }
}
