import {IsNotEmpty,IsEmail,IsDate} from 'class-validator';
import { Type } from 'class-transformer';
import { ModeOfContact } from '../user.model';

 
export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    gender: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    nationality: string;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    dateOfBirth: Date;

    @IsNotEmpty()
    educationBackground: string;

    @IsNotEmpty()
    modeOfContact: ModeOfContact;

    @IsNotEmpty()
    description: string;
}