export interface User {
    id: string,
    name: string,
    gender: string,
    phone: string,
    email: string,
    address: string,
    nationality: string,
    dateOfBirth: Date,
    educationBackground: string,
    modeOfContact: ModeOfContact,
    description: string,
    deleted: boolean,
    createdAt: Date
}

export enum ModeOfContact {
    email = 'email',
    phone = 'phone',
    none = 'none'
}