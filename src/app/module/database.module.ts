import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CONFIG } from '../config/config-keys.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<any>(CONFIG.DB_TYPE),
        host: configService.get(CONFIG.DB_HOST),
        port: configService.get(CONFIG.DB_PORT),
        username: configService.get(CONFIG.DB_USERNAME),
        password: configService.get(CONFIG.DB_PASSWORD),
        database: configService.get<string>(CONFIG.DB_NAME),
        schema: configService.get(CONFIG.DB_SCHEMA),
        synchronize: configService.get(CONFIG.DB_SYNCHRONIZE),
        ssl: configService.get(CONFIG.DB_SSL) === true,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
