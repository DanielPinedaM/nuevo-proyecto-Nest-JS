import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Exclude } from "class-transformer";

@Entity("TBL_BASE")
@Unique(["email"]) // Valor único
export class BaseEntity {
    
    @Exclude()
    @PrimaryGeneratedColumn({
        name: "ID", 
    })
    id: number;

    @Column({
        name: "BASE_FIRST_NAME",
        type: 'text',
        nullable: false
    })
    firstName: string;

    @Column({
        name: 'BASE_LAST_NAME',
        type: 'text',
        nullable: false
    })
    lastName: string

    @Column({
        name: 'BASE_EMAIL',
        type: 'text',
        nullable: false
    })
    email: string

    @Column({
        name: "BASE_PHONE",    
        type: "bigint",
        nullable: true
    })
    phone: number;

    @Column({
        name: "BASE_ACTIVE",
        type: "boolean",
        nullable: false,
        default: true
    })
    isActive: boolean;
}
