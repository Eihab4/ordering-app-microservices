/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class HandledOrderCreatedDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsPositive()
    @IsNotEmpty()
    price: number;
}
