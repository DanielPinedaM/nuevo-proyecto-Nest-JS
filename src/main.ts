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
import { CONFIG } from '@/app/config/config-keys.config';

// manejo de excepciones
import { AllExceptionsFilter } from '@/app/common/filter/exceptions-response.filter';

// manejo de respuesta exitosas
import { SuccessResponseInterceptor } from '@/app/common/interceptor/success-response.interceptor';

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
  app.setGlobalPrefix('api');
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
listar rutas (URL endpoints) disponibles en consola */
function listRoutes(app: INestApplication): void {
  const server = app.getHttpServer();
  const router = server._events.request._router;

  const availableRoutes = (router?.stack ?? [])
    .filter((layer) => layer.route)
    .map((layer) => ({
      route: {
        path: layer.route?.path,
        method: layer.route?.stack?.[0]?.method,
      },
    }));

  if (availableRoutes?.length > 0) {
    log.info(`\x1b[34mtotal de rutas: ${availableRoutes.length}\x1b[0m`);

    log.info('\x1b[34mlista de endpoints:\x1b[0m');
    console.table(availableRoutes);
  } else {
    log.info(`\x1b[33mno hay endpoints\x1b[0m`);
  }
}

/* *********************
 * inicializar Nest JS *
 * ********************* */
async function bootstrap(): Promise<void> {
  console.info('\n');

  const app: INestApplication<any> = await NestFactory.create(AppModule);
  const configService: ConfigService<unknown, boolean> = app.get(ConfigService);

  setupGlobalMiddleware(app);
  setupCore(app);
  setupSwagger(app);

  const port: number = configService.get(CONFIG?.PORT);
  const env: string = configService.get(CONFIG?.ENV);

  await app.listen(port);
  listRoutes(app);

  log.info(
    `\x1b[34mbackend ejecutandose en el puerto ${port} y apuntando al entorno env ${env}\x1b[0m`,
  );

  console.info('\n');
}

bootstrap();
