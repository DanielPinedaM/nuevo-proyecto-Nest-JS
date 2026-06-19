import { Module, Global } from '@nestjs/common';
import { LoggerService } from '@/shared/services/logger.service';
import { CryptoService } from '@/shared/services/crypto.service';
import { CleanupLogsTasks } from '@/shared/tasks/cleanup-logs.tasks';

@Global()
@Module({
  providers: [LoggerService, CryptoService, CleanupLogsTasks],
  exports: [LoggerService, CryptoService],
})
export class ServiceModule {}
