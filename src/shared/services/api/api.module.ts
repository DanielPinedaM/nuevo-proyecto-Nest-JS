import { Module, Global } from '@nestjs/common';
import { ApiGatewayService } from '@/shared/services/api/http-client/http-gateway-axios.api';

@Global()
@Module({
  providers: [ApiGatewayService],
  exports: [ApiGatewayService],
})
export class ApiModule {}
