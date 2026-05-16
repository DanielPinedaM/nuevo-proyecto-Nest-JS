import { Module, Global } from '@nestjs/common';
import { LoggerService } from '@/shared/services/logger.service';
import { CleanupLogsTasks } from '@/shared/tasks/cleanup-logs.tasks';

@Global()
@Module({
  providers: [LoggerService, CleanupLogsTasks],
  exports: [LoggerService],
})
export class ServiceModule {}
