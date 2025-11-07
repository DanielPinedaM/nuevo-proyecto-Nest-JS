import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_VARS, EnvironmentClass } from 'environments/env-config';
import { log } from '@/app/models/constants/general.const';

const databaseConnection = (env: ConfigService<EnvironmentClass>) => ({
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
  retryAttempts: env.get(ENV_VARS.DB_RETRY_ATTEMPTS),
  retryDelay: env.get(ENV_VARS.DB_RETRY_DELAY),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (env: ConfigService<EnvironmentClass>) => {
        const DB_NAME: string = env.get<string>(ENV_VARS.DB_NAME);
        const options = databaseConnection(env);

        try {
          const { DataSource } = await import('typeorm');
          const ds = new DataSource(options);
          await ds.initialize();
          log.info(`\x1b[32m conectado a la base de datos ${DB_NAME}\x1b[0m`);
        } catch (error) {
          log.error(
            `\x1b[31merror al conectar a la base de datos ${DB_NAME} ${JSON.stringify(error)} \x1b[0m`,
          );
        }

        return options;
      },
    }),
  ],
})
export class DatabaseModule {}
