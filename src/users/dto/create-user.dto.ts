import {IsNotEmpty,IsEmail,IsDate,Contains} from 'class-validator';

//(select one from email, phone, none) 
 
export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    gender: string

    @IsNotEmpty()
    phone: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    address: string

    @IsNotEmpty()
    nationality: string

    @IsDate()
    dateOfBirth: string

    @IsNotEmpty()
    educationBackground: string

    @IsNotEmpty()
    modeOfContact: string

    @IsNotEmpty()
    description: string;
}