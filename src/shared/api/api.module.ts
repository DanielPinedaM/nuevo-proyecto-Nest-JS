import { Module, Global } from '@nestjs/common';
import { ApiGatewayService } from '@/shared/api/general-api/http-gateway-axios.api';

@Global()
@Module({
  providers: [ApiGatewayService],
  exports: [ApiGatewayService],
})
export class ApiModule {}
