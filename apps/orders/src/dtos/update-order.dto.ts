/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateOrderDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional() 
    phone?: string;

    @IsPositive()
    @IsOptional()
    price?: number;
}
