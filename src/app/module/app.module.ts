import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { DatabaseModule } from '@/app/module/database.module';
import { LoggerMiddleware } from '@/app/common/middlewares/logger.middleware';
import { UtilsModule } from '@/app/utils/utils.module';
import { ServiceModule } from '@/app/common/services/service.module';
import {
  ENV_VARS,
  EnvironmentClass,
  validateEnvironment,
} from 'environments/env-config';
import { AuthModule } from '@/app/features/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { CleanupLogsTasks } from '@/app/common/tasks/cleanup-logs.tasks';

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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, CleanupLogsTasks],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
