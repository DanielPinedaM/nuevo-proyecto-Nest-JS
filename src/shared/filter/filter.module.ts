import { Module } from '@nestjs/common';
import { ErrorLogsFilter } from '@/shared/filter/error-logs.filter';
import { StandardizeErrorResponseFilter } from '@/shared/filter/standardize-error-response.filter';

@Module({
  providers: [ErrorLogsFilter, StandardizeErrorResponseFilter],
  exports: [ErrorLogsFilter, StandardizeErrorResponseFilter],
})
export class FilterModule {}
