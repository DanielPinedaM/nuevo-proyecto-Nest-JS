import { Controller, Post, Get, Body, Param, NotFoundException, BadRequestException, UseInterceptors, Put, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseDto } from 'src/app/dto/base.dto';
import { BaseService } from 'src/app/services/base/base.service';
import { apiVersion, baseApiTag, baseError, baseSuccess } from '@/app/models/constants/general.constants';
import { SuccessResponseInterceptor } from '@/app/utils/response/success-response.utils';

@ApiTags(baseApiTag)
@Controller({
  path: 'base',
  version: apiVersion
})
export class BaseController {
  constructor(private readonly baseService: BaseService) { }


  @Get('/')
  @UseInterceptors(SuccessResponseInterceptor)
  @ApiResponse({ status: 201, description: baseSuccess })
  @ApiResponse({ status: 404, description: baseError })
  async findAll() {
    try {

      return await this.baseService.getAllUser();

    } catch (error) {
      throw error
    }
  }
  
  @Get('/active')
  @UseInterceptors(SuccessResponseInterceptor)
  @ApiResponse({ status: 201, description: baseSuccess })
  @ApiResponse({ status: 404, description: baseError })
  async findUserActive(active: boolean = true) {
    try {
      return await this.baseService.findUserActive(active);
    } catch (error) {
      throw error
    }
  }

  @Get(':name')
  @UseInterceptors(SuccessResponseInterceptor)
  @ApiResponse({ status: 201, description: baseSuccess })
  @ApiResponse({ status: 404, description: baseError })
  async findByName(@Param('name') name: string) {
    try {
      const user = await this.baseService.findByName(name);

      if (!user) {
        throw new NotFoundException(`Usuario con nombre ${name} No encontrado`);
      }

      return user;
    } catch (error) {
      throw error
    }
  }

  @Get('/id/:id')
  @UseInterceptors(SuccessResponseInterceptor)
  @ApiResponse({ status: 201, description: baseSuccess })
  @ApiResponse({ status: 404, description: baseError })
  async findById(@Param('id') id: number) {
    try {
      const user = await this.baseService.findById(id);

      if (!user) {
        throw new NotFoundException(`Usuario con el id ${id} No encontrado`)
      }

      return user;

    } catch (error) {
      throw error
    }
  }

  @Post('/')
  @UseInterceptors(SuccessResponseInterceptor)
  @ApiResponse({ status: 201, description: baseSuccess })
  @ApiResponse({ status: 401, description: baseError })
  async setUser(@Body() request: BaseDto) {
    try {
      return await this.baseService.saveUser(request);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Put(':id')
  @UseInterceptors(SuccessResponseInterceptor)
  @ApiResponse({ status: 201, description: baseSuccess })
  @ApiResponse({ status: 401, description: baseError })
  async updateUser(@Param('id') id: number, @Body() updateData: BaseDto) {
    try {
      return this.baseService.updateUser(id, updateData);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  @UseInterceptors(SuccessResponseInterceptor)
  @ApiResponse({ status: 201, description: baseSuccess })
  @ApiResponse({ status: 401, description: baseError })
  async deleteUser(@Param('id') id: number) {
    try {
      return this.baseService.inactiveUser(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  
  @Put('/active/:id')
  @UseInterceptors(SuccessResponseInterceptor)
  @ApiResponse({ status: 201, description: baseSuccess })
  @ApiResponse({ status: 401, description: baseError })
  async activeUser(@Param('id') id: number) {
    try {
      return this.baseService.activeUser(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
