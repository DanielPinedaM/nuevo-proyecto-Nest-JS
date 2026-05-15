import { Module, Global } from '@nestjs/common';
import { ApiGatewayService } from '@/app/shared/API/general-API/http-gateway-axios.api';

@Global()
@Module({
  providers: [ApiGatewayService],
  exports: [ApiGatewayService],
})
export class ApiModule {}
