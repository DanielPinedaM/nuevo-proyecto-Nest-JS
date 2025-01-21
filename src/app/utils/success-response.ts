import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuccessResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const httpContext = context.switchToHttp();
        const response = httpContext.getResponse();
        const status = response.statusCode;

        return next.handle().pipe(
            map((data) => ({
                success: true,
                message: 'Solicitud exitosa',
                status: status,
                data: data?.data || data 
            })),
        );
    }
}
