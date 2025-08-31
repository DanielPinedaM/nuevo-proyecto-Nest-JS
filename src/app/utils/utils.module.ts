import { Global, Module } from '@nestjs/common';
import { CryptoService } from '@/app/utils/CryptoServiceClass.utils';

const modules = [CryptoService];

@Global()
@Module({
  providers: modules,
  exports: modules,
})
export class UtilsModule {}
