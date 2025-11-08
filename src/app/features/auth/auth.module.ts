import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '@/app/features/auth/entities/users.entity';
import { AuthController } from '@/app/features/auth/auth.controller';
import { AuthService } from '@/app/features/auth/auth.service';

@Module({
  imports: [
    //TypeOrmModule.forFeature([Users])
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
