import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '@/app/entities/users/users.entity';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { CryptoService } from '@/app/utils/CryptoServiceClass.utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
  ) {}

  async loginUser(
    encryptedEmail: string,
    encryptedPassword: string,
    response: Response,
  ): Promise<any> {
    const { email, password } = await this.decryptCredentials(
      encryptedEmail,
      encryptedPassword,
    );

    const foundUser = await this.usersRepository.findOne({
      where: { User: email },
    });

    if (!foundUser) throw new UnauthorizedException('Usuario no encontrado');

    const isPasswordValid = await bcrypt.compare(password, foundUser.Password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Credenciales inválidas');

    const { Password, ...user } = foundUser;

    const token = this.generateToken(user);

    response.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 1000 * 60 * 60,
    });

    return { status: 200, message: 'inicio de sesión exitoso' };
  }

  async decryptCredentials(
    encryptedEmail: string,
    encryptedPassword: string,
  ): Promise<{ email: string; password: string }> {
    const [email, password] = await Promise.all([
      this.cryptoService.decrypt(encryptedEmail),
      this.cryptoService.decrypt(encryptedPassword),
    ]);

    return { email, password };
  }

  generateToken(user: any) {
    const payload = { username: user.User, sub: user.id, role: user.RolId };
    return this.jwtService.sign(payload);
  }

  async logout(response: Response) {
    response.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    });

    return {
      status: 200,
      message: 'cierre de sesión exitoso',
    };
  }
}
