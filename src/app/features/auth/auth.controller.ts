import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@/app/features/auth/auth.service';
import { Response } from 'express';
import { AuthGuard } from '@/shared/guard/auth.guard';
import { LoginDto } from '@/app/features/auth/dto/users.dto';
import { RegisterDto } from '@/app/features/auth/dto/register.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'iniciar sesión' })
  @Post('login')
  login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(loginDto.email, loginDto.password, response);
  }

  @ApiOperation({ summary: 'cerrar sesión' })
  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@Res() response: Response) {
    return this.authService.logout(response);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }
}
