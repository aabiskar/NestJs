import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private filePath;
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    readStream(stream: any): Promise<unknown>;
    readCsvFile(): Promise<any>;
    checkForDuplicates(users: any, email: any): boolean;
    postUser(createUserDto: CreateUserDto): Promise<User>;
    writeToCSVFile(results: any): Promise<unknown>;
    extractAsCSV(results: any): string;
}
