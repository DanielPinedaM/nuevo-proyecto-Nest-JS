import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CONFIG, EnvironmentClass } from 'environments/env-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvironmentClass>) => ({
        type: config.get<any>(CONFIG.DB_TYPE),
        host: config.get(CONFIG.DB_HOST),
        port: config.get(CONFIG.DB_PORT),
        username: config.get(CONFIG.DB_USERNAME),
        password: config.get(CONFIG.DB_PASSWORD),
        database: config.get<string>(CONFIG.DB_NAME),
        schema: config.get(CONFIG.DB_SCHEMA),
        synchronize: config.get(CONFIG.DB_SYNCHRONIZE),
        ssl: config.get(CONFIG.DB_SSL) === true,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
