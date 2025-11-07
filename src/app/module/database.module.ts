import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_VARS, EnvironmentClass } from 'environments/env-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvironmentClass>) => ({
        type: config.get<any>(ENV_VARS.DB_TYPE),
        host: config.get(ENV_VARS.DB_HOST),
        port: config.get(ENV_VARS.DB_PORT),
        username: config.get(ENV_VARS.DB_USERNAME),
        password: config.get(ENV_VARS.DB_PASSWORD),
        database: config.get<string>(ENV_VARS.DB_NAME),
        schema: config.get(ENV_VARS.DB_SCHEMA),
        synchronize: config.get(ENV_VARS.DB_SYNCHRONIZE),
        ssl: config.get(ENV_VARS.DB_SSL),
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
