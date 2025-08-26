import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  apiVersion,
  authApiTag,
} from '@/app/models/constants/general.constants';
import { SuccessResponseInterceptor } from '@/app/utils/response/success-response.utils';
import { AuthService } from '@/app/services/auth/auth.service';
import { Response } from 'express';

// DTOs
import { loginDto } from '@/app/dto/auth/auth.dto';

@ApiTags(authApiTag)
@Controller({
  path: 'auth',
  version: apiVersion,
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseInterceptors(SuccessResponseInterceptor)
  async login(
    @Body() loginDto: loginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(
      loginDto.user,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = await this.authService.login(user);

    res.cookie('sessionId', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60,
    });

    return { status: 200, message: 'Login exitoso' }; // útil para Postman
  }
}
