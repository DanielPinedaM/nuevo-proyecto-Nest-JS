import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiDescription, apiTitle, apiVersion } from './app/utils/constants';
import { json } from 'express';
import { ConfigService } from '@nestjs/config';
import { CONFIG } from './app/config/config-keys';
 
//Manejo de excepciones
import { AllExceptionsFilter } from './app/utils/exceptions';

//Manejo de respuesta exitosas
import { SuccessResponseInterceptor } from './app/utils/success-response';

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

  Logger.log('API list:', 'Bootstrap');
  console.table(availableRoutes);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new SuccessResponseInterceptor());

  app.use(json({ limit: '5mb' }));

  const allowedOrigins = "*";

  Logger.log(`Allowed origins: ${allowedOrigins}`, 'Bootstrap');

  app.enableCors({
    origin: true,
  });

  app.setGlobalPrefix('api');

  app.enableVersioning();

  const config = new DocumentBuilder()
    .setTitle(apiTitle)
    .setDescription(apiDescription)
    .setVersion(apiVersion)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    useGlobalPrefix: false,
  });

  const port: number = configService.get(CONFIG.PORT);
  const env: string = configService.get(CONFIG.ENV);

  await app.listen(port);

  listRoutes(app);

  Logger.log(`App running at port ${port} in environment ${env}`, 'Bootstrap');
}
bootstrap();
