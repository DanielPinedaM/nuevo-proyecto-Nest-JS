import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '@/app/features/auth/entities/users.entity';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { CryptoService } from '@/app/utils/CryptoServiceClass.utils';
import { RegisterDto } from '@/app/features/auth/dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
  ) {}

  async decryptCredentials(
    encryptedEmail: string,
    encryptedPassword: string,
  ): Promise<{ decryptedEmail: string; decryptedPassword: string }> {
    const [decryptedEmail, decryptedPassword] = await Promise.all([
      this.cryptoService.decrypt(encryptedEmail),
      this.cryptoService.decrypt(encryptedPassword),
    ]);

    return { decryptedEmail, decryptedPassword };
  }

  generateToken(data: any): string {
    const token = {
      id: data?.id,
      email: data?.email,
      username: data?.username,
    };

    return this.jwtService.sign(token);
  }

  async login(
    encryptedEmail: string,
    encryptedPassword: string,
    response: Response,
  ): Promise<any> {
    const { decryptedEmail, decryptedPassword } = await this.decryptCredentials(
      encryptedEmail,
      encryptedPassword,
    );

    const foundUser: Users = await this.usersRepository.findOne({
      where: { email: decryptedEmail },
    });

    if (!foundUser) throw new UnauthorizedException('Usuario no encontrado');

    const isPasswordValid: boolean = await bcrypt.compare(
      decryptedPassword,
      foundUser.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('credenciales inválidas');

    const token = this.generateToken(foundUser);

    response.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 1000 * 60 * 60,
    });

    const { id, password, creationDate, ...rest } = foundUser;
    const data = { ...rest };
    return { status: 200, message: 'inicio de sesión exitoso', data };
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

  async registerUser(registerDto: RegisterDto): Promise<any> {
    const {
      email: encryptedEmail,
      password: encryptedPassword,
      username,
    } = registerDto;

    const { decryptedEmail, decryptedPassword } = await this.decryptCredentials(
      encryptedEmail,
      encryptedPassword,
    );

    // Verificar si el email ya existe
    const existingUser: Users = await this.usersRepository.findOne({
      where: { email: decryptedEmail },
    });
    if (existingUser)
      throw new ConflictException('el correo ya está registrado');

    const hashedPassword: string = await bcrypt.hash(decryptedPassword, 10);

    const newUser: Users = this.usersRepository.create({
      email: decryptedEmail,
      username,
      password: hashedPassword,
    });

    await this.usersRepository.save(newUser);

    return {
      status: 201,
      message: 'usuario registrado exitosamente',
    };
  }
}
