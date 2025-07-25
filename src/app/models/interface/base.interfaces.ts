import { TypeOrmModule } from "@nestjs/typeorm";

export interface Base extends TypeOrmModule {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    isActive: boolean
}