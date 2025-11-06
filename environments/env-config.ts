import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { log } from '@/app/models/constants/general.const';

/* *************************************
 * NOMBRES DE LAS VARIABLES DE ENTORNO *
 * ************************************* */
export enum CONFIG {
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
  // #endregion conexion a la base de datos
}

/* *******************************
 * TIPAR LAS VARIABLES DE ENTORNO *
 * ******************************** */
export class EnvironmentClass {
  @IsString()
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

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  DB_SSL: boolean;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  DB_SYNCHRONIZE: boolean;
  // #endregion conexion a la base de datos
}

export function validateEnvironment(
  config: Record<string, any>,
): EnvironmentClass {
  const validatedConfig = plainToInstance(EnvironmentClass, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors?.length > 0) {
    const errorsStringify = JSON.stringify(errors);
    log.error(
      `\x1b[31m error al agregar tipos de datos a las variables de entorno, verifique que las keys del enum y la clase q hay en env-config.ts coincida con los env q estan dentro de la carpeta envinronments ${errorsStringify}\x1b[0m`,
    );
    throw new Error(errorsStringify);
  }

  return validatedConfig;
}
