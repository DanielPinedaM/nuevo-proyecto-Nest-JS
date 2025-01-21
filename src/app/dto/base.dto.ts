import { Entity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString, IsOptional } from "class-validator";

@Entity("TBL_BASE")
export class BaseDto {

    @ApiProperty({
        example: 'Carolina',
    })
    @IsString()
    firstName: string;
     
    @ApiProperty({
        example: 'Jimenez',
    })
    @IsString()
    lastName: string;

    @ApiProperty({
        example: 'example@xyz.com',
    })
    @IsString()
    email: string;

    @ApiProperty({
        example: 3197280610
    })
    @IsOptional()
    @IsNumber()
    phone: number

    @ApiProperty({
        example: true
    })
    @IsBoolean()
    isActive: boolean

}