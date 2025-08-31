import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  apiVersion,
  authApiTag,
} from '@/app/models/constants/general.constants';
import { AuthService } from '@/app/features/auth/auth.service';
import { Response } from 'express';
import { AuthGuard } from '@/app/guard/auth/auth.guard';
import { LoginDto } from '@/app/features/auth/dto/auth.dto';

@ApiTags(authApiTag)
@Controller({
  path: 'auth',
  version: apiVersion,
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'iniciar sesión' })
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.loginUser(
      loginDto.email,
      loginDto.password,
      response,
    );
  }

  @ApiOperation({ summary: 'cerrar sesión' })
  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@Res() response: Response) {
    return this.authService.logout(response);
  }
}
