import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '@/app/entities/users/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async validateUser(user: string, pass: string): Promise<any> {
    const foundUser = await this.usersRepository.findOne({
      where: { User: user },
    });

    if (!foundUser) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const hash = await bcrypt.hash(pass, 10);

    // 🔑 Verificar contraseña
    console.log('foundUser.Password', foundUser.Password);
    const isPasswordValid = await bcrypt.compare(pass, foundUser.Password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Retornamos el usuario sin la contraseña
    const { Password, ...result } = foundUser;
    return result;
  }

  async login(user: any): Promise<string> {
    const payload = { username: user.User, sub: user.UserId, role: user.RolId };
    return this.jwtService.sign(payload);
  }
}
