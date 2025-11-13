import { Module, Global } from '@nestjs/common';
import { HttpService } from '@/app/shared/services/http-general-service/http.service';
import { LoggerService } from '@/app/shared/services/logger.service';
import { CleanupLogsTasks } from '@/app/shared/tasks/cleanup-logs.tasks';

@Global()
@Module({
  providers: [HttpService, LoggerService, CleanupLogsTasks],
  exports: [HttpService, LoggerService],
})
export class ServiceModule {}
