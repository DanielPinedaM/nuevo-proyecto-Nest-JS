import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @ApiProperty({ type: String, description: 'Correo electrónico del usuario' })
  @IsEmail({}, { message: 'El correo es inválido' })
  @IsString()
  @Transform(({ value }) => value.trim())
  email: string;

  @ApiProperty({ type: String, description: 'Contraseña del usuario' })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}
