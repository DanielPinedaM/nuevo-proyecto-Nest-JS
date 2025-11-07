import { IsBoolean, IsIn, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { log } from '@/app/models/constants/general.const';

/* *************************************
 * NOMBRES DE LAS VARIABLES DE ENTORNO *
 * ************************************* */
export enum ENV_VARS {
  ENVIRONMENT = 'ENVIRONMENT',
  PORT = 'PORT',

  // #region conexion a la base de datos
  DB_TYPE = 'DB_TYPE',
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',
  DB_USERNAME = 'DB_USERNAME',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_NAME = 'DB_NAME',
  DB_SCHEMA = 'DB_SCHEMA',
  DB_SSL = 'DB_SSL',
  DB_SYNCHRONIZE = 'DB_SYNCHRONIZE',
  DB_AUTO_LOAD_ENTITIES = 'DB_AUTO_LOAD_ENTITIES',
  DB_RETRY_ATTEMPTS = 'DB_RETRY_ATTEMPTS',
  DB_RETRY_DELAY = 'DB_RETRY_DELAY',
  // #endregion conexion a la base de datos
}

/* *******************************
 * TIPAR LAS VARIABLES DE ENTORNO *
 * ******************************** */
export class EnvironmentClass {
  @IsString()
  @IsIn(['localhost', 'production', 'test'])
  ENVIRONMENT: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  PORT: number;

  // #region conexion a la base de datos
  @IsString()
  DB_TYPE: string;

  @IsString()
  DB_HOST: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  DB_SCHEMA: string;

  @Transform(({ value }) => String(value).trim().toLowerCase() === 'true')
  @IsBoolean()
  DB_SSL: boolean;

  @Transform(({ value }) => String(value).trim().toLowerCase() === 'true')
  @IsBoolean()
  DB_SYNCHRONIZE: boolean;

  @Transform(({ value }) => String(value).trim().toLowerCase() === 'true')
  @IsBoolean()
  DB_AUTO_LOAD_ENTITIES: boolean;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  DB_RETRY_ATTEMPTS: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  DB_RETRY_DELAY: number;
  // #endregion conexion a la base de datos
}

export function validateEnvironment(
  config: Record<string, any>,
): EnvironmentClass {
  const validatedConfig = plainToInstance(EnvironmentClass, config, {
    enableImplicitConversion: false,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors?.length > 0) {
    const errorsStringify = JSON.stringify(errors);
    log.error(
      `\x1b[31m error al configurar tipos de datos a las variables de entorno, verifique que las keys del enum y la clase q hay en env-config.ts coincida con los env q estan dentro de la carpeta envinronments ${errorsStringify}\x1b[0m`,
    );
    throw new Error(errorsStringify);
  }

  return validatedConfig;
}
