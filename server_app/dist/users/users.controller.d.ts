import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { ModeOfContactValidationPipe } from './pipes/user-validation';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getAllUsers(): Promise<User[]>;
    getUser(id: string): Promise<User>;
    postUser(modeOfContact: ModeOfContactValidationPipe, createUserDto: CreateUserDto): Promise<User>;
}
