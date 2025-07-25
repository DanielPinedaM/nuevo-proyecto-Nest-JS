import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import {
  apiDescription,
  apiTitle,
  apiVersion,
} from './app/models/constants/general.constants';
import { json } from 'express';
import { ConfigService } from '@nestjs/config';
import { CONFIG } from './app/config/config-keys.config';
import chalk from 'chalk';

//Manejo de excepciones
import { AllExceptionsFilter } from './app/utils/exceptions.utils';

//Manejo de respuesta exitosas
import { SuccessResponseInterceptor } from './app/utils/success-response.utils';

function listRoutes(app: INestApplication) {
  const server = app.getHttpServer();
  const router = server._events.request._router;
  const availableRoutes: [] = router?.stack
    .filter((layer) => layer.route)
    .map((layer) => ({
      route: {
        path: layer.route?.path,
        method: layer.route?.stack[0]?.method,
      },
    }));

  Logger.log(chalk.blueBright('📡 Lista de APIs:'), 'Bootstrap');
  console.table(availableRoutes);
  Logger.log(
    chalk.gray(`🛣️ Total de rutas: ${availableRoutes.length}`),
    'Bootstrap',
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService<unknown, boolean> = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new SuccessResponseInterceptor());

  app.use(json({ limit: '5mb' }));

  const allowedOrigins = '*';
  Logger.log(
    chalk.yellowBright(`🌐 Orígenes permitidos: `) +
      chalk.whiteBright(allowedOrigins),
    'Bootstrap',
  );

  app.enableCors({
    origin: true,
  });

  app.setGlobalPrefix('api');

  app.enableVersioning();

  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle(apiTitle)
    .setDescription(apiDescription)
    .setVersion(apiVersion)
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    useGlobalPrefix: false,
  });

  const port: number = configService.get(CONFIG?.PORT);
  const env: string = configService.get(CONFIG?.ENV);

  await app.listen(port);

  listRoutes(app);

  Logger.log(
    chalk.greenBright('🖥️ Aplicación ejecutándose en el puerto ') +
      chalk.yellowBright(port) +
      chalk.greenBright(' en el entorno ') +
      chalk.magentaBright(env),
    'Bootstrap',
  );
}
bootstrap();
