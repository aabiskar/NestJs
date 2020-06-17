"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_model_1 = require("./user.model");
const uuid_1 = require("uuid");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
let results = [];
let UsersService = class UsersService {
    constructor() {
        this.filePath = path.join(__dirname, '../../csv/users.csv');
    }
    async getAllUsers() {
        const users = await this.readCsvFile();
        return users;
    }
    async getUserById(id) {
        const users = await this.readCsvFile();
        const user = users.find(user => user.id === id);
        if (!user) {
            throw new common_1.NotFoundException(`User not found`);
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
        const users = await this.readStream(stream);
        return users;
    }
    checkForDuplicates(users, email) {
        const duplicate = users.find(user => user.email === email);
        return !!duplicate;
    }
    async postUser(createUserDto) {
        const { email, dateOfBirth, modeOfContact } = createUserDto;
        const createdAt = new Date();
        const user = Object.assign({ id: uuid_1.v1(), createdAt, dateOfBirth: new Date(dateOfBirth), deleted: false, modeOfContact: user_model_1.ModeOfContact[modeOfContact] }, createUserDto);
        const users = await this.readCsvFile();
        const duplicate = this.checkForDuplicates(users, email);
        if (!duplicate) {
            users.unshift(user);
            await this.writeToCSVFile(users);
            return user;
        }
        throw new common_1.ConflictException(`User with Email ${email} already exists`);
    }
    async writeToCSVFile(results) {
        return new Promise((resolve, reject) => {
            const filename = this.filePath;
            fs.writeFile(filename, this.extractAsCSV(results), err => {
                if (err) {
                    console.log('Error writing to csv file', err);
                    reject(err);
                }
                else {
                    console.log(`saved as ${filename}`);
                    resolve(true);
                }
            });
        });
    }
    extractAsCSV(results) {
        const header = ['id,name,gender,phone,email,address,nationality,dateOfBirth,educationBackground,modeOfContact,description,createdAt,deleted'];
        const rows = results.map(user => `${user.id},${user.name},${user.gender},${user.phone},${user.email},${user.address},${user.nationality},${user.dateOfBirth},${user.educationBackground},${user.modeOfContact},${user.description},${user.createdAt},${user.deleted}`);
        return header.concat(rows).join('\n');
    }
};
UsersService = __decorate([
    common_1.Injectable()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map