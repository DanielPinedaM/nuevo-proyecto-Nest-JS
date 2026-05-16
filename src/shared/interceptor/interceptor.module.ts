import { Module } from '@nestjs/common';
import { StandardizeSuccessResponseInterceptor } from '@/shared/interceptor/standardize-success-response.interceptor';
import { SuccessLogsInterceptor } from '@/shared/interceptor/success-logs.interceptor';

@Module({
  providers: [StandardizeSuccessResponseInterceptor, SuccessLogsInterceptor],
  exports: [StandardizeSuccessResponseInterceptor, SuccessLogsInterceptor],
})
export class InterceptorModule {}
