import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app/module/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import {
  apiDescription,
  apiTitle,
  apiVersion,
  log,
} from '@/app/models/constants/general.const';
import { json } from 'express';
import { ConfigService } from '@nestjs/config';
import { ENV_VARS } from 'environments/env-config';

// manejo de excepciones
import { AllExceptionsFilter } from '@/app/common/filter/exceptions-response.filter';

// manejo de respuesta exitosas
import { SuccessResponseInterceptor } from '@/app/common/interceptor/success-response.interceptor';

const globalPrefix = 'api';

/* **********************************
 * funciones para configurar Nest JS *
 * *********************************** */

/**
validaciones, interceptores y filtros globales */
function setupGlobalMiddleware(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new SuccessResponseInterceptor());
  app.use(json({ limit: '5mb' }));
}

/**
CORS, prefijos y versionamiento */
function setupCore(app: INestApplication): void {
  const allowedOrigins: string = '*';
  log.info(`\x1b[34morigenes permitidos: ${allowedOrigins}\x1b[0m`);
  app.enableCors({
    origin: true,
  });
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning();
}

/**
swagger (documentación de la API) */
function setupSwagger(app: INestApplication): void {
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

  if (availableRoutes.length > 0) {
    log.info(`\x1b[34mtotal de rutas: ${availableRoutes.length}\x1b[0m`);
    log.info('\x1b[34mlista de endpoints:\x1b[0m');

    const sortedRoutes: IRoute[] = availableRoutes.sort((a, b) => {
      const cleanA: string = normalizePath(a.path);
      const cleanB: string = normalizePath(b.path);

      return cleanA.localeCompare(cleanB);
    });

    const header: string = `METODO${' '.repeat(20 - 6)} | URL`;
    const table: string = sortedRoutes
      .map((route: IRoute) => `${route.methods.padEnd(20)} | ${route.path}`)
      .join('\n');

    log.info(`\n${header}\n${'-'.repeat(50)}\n${table}`);
  } else {
    log.info(`\x1b[33mNo hay endpoints\x1b[0m`);
  }
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

  setupGlobalMiddleware(app);
  setupCore(app);
  setupSwagger(app);

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
