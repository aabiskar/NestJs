import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ModeOfContact, User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto'
import { v1 as uuidv1 } from 'uuid';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import * as path from 'path';

let results = [];

@Injectable()
export class UsersService {
    private filePath = path.join(__dirname, '../../csv/users.csv');

    async getAllUsers(): Promise<User[]> {
        const users = await this.readCsvFile();
        return users;
    }

    async getUserById(id: string): Promise<User> {
        const users = await this.readCsvFile();
        const user = users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException(`User not found`);
        }
        return user;
    }

    async readStream(stream) {
        return new Promise((resolve, reject) => {
            results = [];
            stream.on('data', function (row) {
                results.push(row);
            });
            stream.on("end", () => resolve(results));
            stream.on("error", error => {
                reject(error);
            });
        });
    }

    async readCsvFile() {
        const stream = fs.createReadStream(this.filePath).pipe(csv());
        const users: any = await this.readStream(stream);
        return users;
    }

    checkForDuplicates(users, email) {
        const duplicate = users.find(user => user.email === email);
        return !!duplicate;
    }

    async postUser(createUserDto: CreateUserDto): Promise<User> {
        const { email, dateOfBirth, modeOfContact } = createUserDto;
        const createdAt = new Date();

        const user: User = {
            id: uuidv1(),
            createdAt,
            dateOfBirth: new Date(dateOfBirth), //2020-09-09
            deleted: false,
            modeOfContact: ModeOfContact[modeOfContact],
            ...createUserDto
        };
        const users = await this.readCsvFile();
        const duplicate = this.checkForDuplicates(users, email);
        if (!duplicate) {
            users.unshift(user);
            await this.writeToCSVFile(users);
            return user;
        }
        throw new ConflictException(`User with Email ${email} already exists`);
    }

    async writeToCSVFile(results: any) {
        return new Promise((resolve, reject) => {
            const filename = this.filePath;
            fs.writeFile(filename, this.extractAsCSV(results), err => {
                if (err) {
                    console.log('Error writing to csv file', err);
                    reject(err);
                } else {
                    console.log(`saved as ${filename}`);
                    resolve(true)
                }
            });
        })
    }

    extractAsCSV(results) {
        const header = ['id,name,gender,phone,email,address,nationality,dateOfBirth,educationBackground,modeOfContact,description,createdAt,deleted'];
        const rows = results.map(
            user => `${user.id},${user.name},${user.gender},${user.phone},${user.email},${user.address},${user.nationality},${user.dateOfBirth},${user.educationBackground},${user.modeOfContact},${user.description},${user.createdAt},${user.deleted}`
        );
        return header.concat(rows).join('\n');
    }
}
