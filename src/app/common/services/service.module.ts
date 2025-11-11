import { Module, Global } from '@nestjs/common';
import { HttpService } from '@/app/common/services/http-general-service/http.service';
import { LoggerService } from '@/app/common/services/logger.service';
import { CleanupLogsTasks } from '@/app/common/tasks/cleanup-logs.tasks';

@Global()
@Module({
  providers: [HttpService, LoggerService, CleanupLogsTasks],
  exports: [HttpService, LoggerService],
})
export class ServiceModule {}
