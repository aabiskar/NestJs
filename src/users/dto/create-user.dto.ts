import {IsNotEmpty,IsEmail} from 'class-validator';
 
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

    @IsNotEmpty()
    dateOfBirth: string

    @IsNotEmpty()
    educationBackground: string

    @IsNotEmpty()
    modeOfContact: string

    @IsNotEmpty()
    description: string;
}