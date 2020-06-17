import { ModeOfContact } from '../user.model';
export declare class CreateUserDto {
    name: string;
    gender: string;
    phone: string;
    email: string;
    address: string;
    nationality: string;
    dateOfBirth: Date;
    educationBackground: string;
    modeOfContact: ModeOfContact;
    description: string;
}
