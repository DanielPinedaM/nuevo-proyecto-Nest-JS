import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  apiVersion,
  authApiTag,
} from '@/app/models/constants/general.constants';
import { SuccessResponseInterceptor } from '@/app/utils/response/success-response.utils';
import { AuthService } from '@/app/services/auth/auth.service';
import { Response } from 'express';
import { AuthGuard } from '@/app/guard/auth.guard';
import { LoginDto } from '@/app/dto/auth/auth.dto';

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
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = await this.authService.login(user);

    res.cookie('sessionId', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 1000 * 60 * 60,
    });

    return { status: 200, message: 'inicio de sesion exitoso' };
  }

  @ApiOperation({ summary: 'Cerrar sesión' })
  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@Res() response: Response) {
    return this.authService.logout(response);
  }
}
