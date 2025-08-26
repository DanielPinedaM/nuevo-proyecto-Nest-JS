import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class loginDto {
  @ApiProperty({
    description: 'Usuario destinado para el inicio de sesion',
    example: 'Brayan.jimenez',
  })
  @IsString()
  @IsNotEmpty({ message: 'el usuario es requerido' })
  user: string;

  @ApiProperty({
    description: 'contraseña de inicio de sesion',
    example: 'Bor0604*',
  })
  @IsString()
  @IsNotEmpty({ message: 'la contraseña es requerida' })
  @MaxLength(255, { message: 'la contraseña no puede superar los 255 caracteres' })
  password: string;
}
