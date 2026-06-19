import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { DatabaseModule } from '@/app/module/database.module';
import { ServiceModule } from '@/shared/services/service.module';
import {
  ENV_VARS,
  EnvironmentClass,
  validateEnvironment,
} from 'environments/env-config';
import { AuthModule } from '@/app/features/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { CleanupLogsTasks } from '@/shared/tasks/cleanup-logs.tasks';
import { FilterModule } from '@/shared/filter/filter.module';
import { InterceptorModule } from '@/shared/interceptor/interceptor.module';
import { ApiModule } from '@/shared/services/api/api.module';
import { UtilsModule } from '@/shared/utils/utils.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: `environments/.env.${process?.env?.ENVIRONMENT ?? 'test'}`,
      isGlobal: true,
      validate: (config: Record<string, any>) => validateEnvironment(config),
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (env: ConfigService<EnvironmentClass>) => ({
        secret: env.get(ENV_VARS.JWT_SECRET_KEY, { infer: true }),
        signOptions: { expiresIn: '24h' },
      }),
    }),
    //DatabaseModule,
    //TypeOrmModule,
    UtilsModule,
    ServiceModule,
    ApiModule,
    AuthModule,
    FilterModule,
    InterceptorModule,
  ],
  controllers: [AppController],
  providers: [AppService, CleanupLogsTasks],
})
export class AppModule {}
