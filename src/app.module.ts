import { Module } from '@nestjs/common';
import { BaseModule } from './app/base.module';
import { DatabaseModule } from './app/database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    BaseModule,
    HttpModule,
    DatabaseModule,
    TypeOrmModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
