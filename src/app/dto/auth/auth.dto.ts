import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: String, description: 'Correo del usuario' })
  @IsEmail({}, { message: 'El correo no es valido' })
  @IsString()
  email: string;

  @ApiProperty({ type: String, description: 'Contraseña del usuario' })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @Transform(({ value }) => value.trim())
  password: string;
}
