import { Module } from '@nestjs/common';
import { StandardizeSuccessResponseInterceptor } from '@/app/shared/interceptor/standardize-success-response.interceptor';
import { SuccessLogsInterceptor } from '@/app/shared/interceptor/success-logs.interceptor';

@Module({
  providers: [StandardizeSuccessResponseInterceptor, SuccessLogsInterceptor],
  exports: [StandardizeSuccessResponseInterceptor, SuccessLogsInterceptor],
})
export class InterceptorModule {}
