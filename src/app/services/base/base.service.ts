import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseDto } from 'src/app/dto/base.dto';
import { BaseEntity } from 'src/app/entities/base.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BaseService {
  constructor(
    @InjectRepository(BaseEntity)
    private readonly baseRepository: Repository<BaseEntity>
  ) { }

  async getAllUser() {
    try {
      return await this.baseRepository.find({
        order: {
          id: "ASC"
        }
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findUserActive(isActive: boolean): Promise<BaseEntity[]> {
    return this.baseRepository.find({
      where: { isActive },
      order: {
        id: "ASC"
      }
    });
  }

  async findByName(firstName: string): Promise<BaseEntity> {
    try {
      const user = await this.baseRepository.findOne({
        where: { firstName },
        order: {
          id: "ASC"
        }
      });

      if (!user) {
        throw new NotFoundException(`Usuario con nombre ${firstName} no encontrado`);
      }

      return user;

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async findById(id: number): Promise<BaseEntity> {
    try {
      const user = await this.baseRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`Usuario con id ${id} No encontrado`);
      }

      return user;

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async saveUser(request: BaseDto) {
    try {
      return await this.baseRepository.save(request);
    } catch (error) {
      if (error.code === '23505') {
        throw new InternalServerErrorException('El correo electrónico ya está registrado.');
      }
      throw new InternalServerErrorException('No se pudo guardar el usuario');
    }
  }

  async updateUser(id: number, updateData: BaseDto): Promise<BaseEntity> {
    try {
      const user = await this.baseRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`Usuario con id ${id} no encontrado`);
      }

      Object.assign(user, updateData);

      return await this.baseRepository.save(user);

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async inactiveUser(id: number): Promise<BaseEntity> {
    try {
      const user = await this.baseRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`Usuario con id ${id} no encontrado`);
      }

      user.isActive = false;

      return await this.baseRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async activeUser(id: number): Promise<BaseEntity> {
    try {
      const user = await this.baseRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`Usuario con id ${id} no encontrado`);
      }

      user.isActive = true;

      return await this.baseRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
