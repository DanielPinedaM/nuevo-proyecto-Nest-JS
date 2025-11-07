import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_VARS, EnvironmentClass } from 'environments/env-config';

const databaseConfig = (env: ConfigService<EnvironmentClass>) => ({
  type: env.get<any>(ENV_VARS.DB_TYPE),
  host: env.get(ENV_VARS.DB_HOST),
  port: env.get(ENV_VARS.DB_PORT),
  username: env.get(ENV_VARS.DB_USERNAME),
  password: env.get(ENV_VARS.DB_PASSWORD),
  database: env.get<string>(ENV_VARS.DB_NAME),
  schema: env.get(ENV_VARS.DB_SCHEMA),
  synchronize: env.get(ENV_VARS.DB_SYNCHRONIZE),
  ssl: env.get(ENV_VARS.DB_SSL),
  autoLoadEntities: env.get(ENV_VARS.DB_AUTO_LOAD_ENTITIES),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (env: ConfigService<EnvironmentClass>) => databaseConfig(env),
    }),
  ],
})
export class DatabaseModule {}
