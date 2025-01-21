import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';

@Injectable()
export class BaseRepository extends Repository<BaseEntity> {
  constructor(private readonly repository: Repository<BaseEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findByName(firstName: string): Promise<BaseEntity | undefined> {
    return this.repository.findOne({ where: { firstName } });
  }
}
