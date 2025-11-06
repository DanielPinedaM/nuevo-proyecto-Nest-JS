/* *******************************
 * TIPAR LAS VARIABLES DE ENTORNO *
 * ******************************** */

import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

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

  @Transform(({ value }) => (value.trim().toLowerCase() === 'true' ? true : false))
  @IsBoolean()
  DB_SSL: boolean;

  @Transform(({ value }) => (value.trim().toLowerCase() === 'true' ? true : false))
  @IsBoolean()
  DB_SYNCHRONIZE: boolean;
  // #endregion conexion a la base de datos
}
