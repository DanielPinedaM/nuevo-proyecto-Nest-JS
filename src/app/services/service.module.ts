import { Module, Global } from '@nestjs/common';
import { HttpService } from '@/app/services/general-service/http.service';

const modules = [HttpService];

@Global()
@Module({
  providers: modules,
  exports: modules,
})
export class ServiceModule {}
