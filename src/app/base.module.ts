import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Controllers
import { BaseController } from './controllers/base/base.controller';

// Services
import { BaseService } from './services/base/base.service';

// Entities
import { BaseEntity } from './entities/base.entity';

// Nest Modules
import { HttpModule } from '@nestjs/axios';

export const entities = [
  BaseEntity,
];

@Module({
  imports: [TypeOrmModule.forFeature(entities), HttpModule],
  controllers: [BaseController],
  providers: [BaseService],
  exports: [],
})
export class BaseModule {}
