import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app/module/app.module';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import {
  apiDescription,
  apiTitle,
  apiVersion,
} from '@/shared/data-types/constants/general.const';
import { json } from 'express';
import { ConfigService } from '@nestjs/config';
import { ENV_VARS } from 'environments/env-config';

// #region Exception Filter
import { ErrorLogsFilter } from '@/shared/filter/error-logs.filter';
import { StandardizeErrorResponseFilter } from '@/shared/filter/standardize-error-response.filter';
// #endregion Exception Filter

// #region Interceptor
import { StandardizeSuccessResponseInterceptor } from '@/shared/interceptor/standardize-success-response.interceptor';
import { SuccessLogsInterceptor } from '@/shared/interceptor/success-logs.interceptor';
// #endregion Interceptor

// #region logs
import { log } from '@/shared/data-types/constants/logger.const';
import { LoggerService } from '@/shared/services/logger.service';
// #endregion logs

const globalPrefix: string = 'api';

/* **********************************
 * funciones para configurar Nest JS *
 * *********************************** */

/**
ExceptionFilter */
function configExceptionFilter(app: INestApplication): void {
  app.useGlobalFilters(app.get(StandardizeErrorResponseFilter));
  app.useGlobalFilters(app.get(ErrorLogsFilter));
}

/**
Interceptor */
function configInterceptor(app: INestApplication): void {
  app.useGlobalInterceptors(app.get(StandardizeSuccessResponseInterceptor));
  app.useGlobalInterceptors(app.get(SuccessLogsInterceptor));
}

/**
Pipes */
function configPipes(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
}

/**
CORS, prefijos y versionamiento */
function configCore(app: INestApplication): void {
  const allowedOrigins: string = '*';
  log.info(`\x1b[34morigenes permitidos: ${allowedOrigins}\x1b[0m`);
  app.enableCors({
    origin: true,
  });
  app.setGlobalPrefix(globalPrefix);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: apiVersion,
  });
}

/**
swagger (documentación de la API) */
function configSwagger(app: INestApplication): void {
  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle(apiTitle)
    .setDescription(apiDescription)
    .setVersion(apiVersion)
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    useGlobalPrefix: false,
  });
}

/**
listar rutas (URL endpoints) disponibles en consola
https://stackoverflow.com/questions/58255000/how-can-i-get-all-the-routes-from-all-the-modules-and-controllers-available-on */
interface IRoute {
  path: string;
  methods: string;
}
function normalizePath(path: string): string {
  return path
    .replace(new RegExp(`^/${globalPrefix}(/v\\d+)?`), '')
    .replace(/:\w+/g, '');
}
function routesLogger(app: INestApplication): void {
  const server = app.getHttpAdapter().getInstance();
  const router = server.router;

  const availableRoutes: IRoute[] = router.stack
    .filter((layer) => layer?.route)
    .map(
      (layer): IRoute => ({
        path: layer?.route?.path,
        methods: Object.keys(layer?.route?.methods)
          .map((method: string) => method?.toUpperCase())
          .join(', '),
      }),
    )
    .filter((item) => (item?.path ?? '').includes(`/${globalPrefix}`));

  if (availableRoutes.length === 0) {
    log.info(`\x1b[33mNo hay endpoints\x1b[0m`);
    return;
  }

  log.info(`\x1b[34mtotal de rutas: ${availableRoutes.length}\x1b[0m`);
  log.info('\x1b[34mlista de endpoints:\x1b[0m');

  const sortedRoutes: IRoute[] = availableRoutes.sort(
    (a: IRoute, b: IRoute) => {
      const cleanA: string = normalizePath(a.path);
      const cleanB: string = normalizePath(b.path);

      return cleanA.localeCompare(cleanB);
    },
  );

  const header: string = `METODO${' '.repeat(20 - 6)} | URL`;
  const table: string = sortedRoutes
    .map((route: IRoute) => `${route.methods.padEnd(20)} | ${route.path}`)
    .join('\n');

  log.info(`\n${header}\n${'-'.repeat(50)}\n${table}`);
}

/* *********************
 * inicializar Nest JS *
 * ********************* */
async function bootstrap(): Promise<void> {
  log.info('\n');

  const app: INestApplication<any> = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  const env: ConfigService<unknown, boolean> = app.get(ConfigService);

  const loggerService: LoggerService = app.get(LoggerService);
  loggerService.ensureLogDirectories();

  configExceptionFilter(app);
  configInterceptor(app);
  configPipes(app);

  app.use(json({ limit: '5mb' }));

  configCore(app);
  configSwagger(app);

  const PORT: number = env.get(ENV_VARS.PORT);
  const ENVIRONMENT: string = env.get(ENV_VARS.ENVIRONMENT);

  await app.listen(PORT);
  routesLogger(app);

  log.info(
    `\x1b[34mbackend ejecutandose en el puerto ${PORT} y apuntando al entorno env ${ENVIRONMENT}\x1b[0m`,
  );

  log.info('\n');
}

bootstrap();
