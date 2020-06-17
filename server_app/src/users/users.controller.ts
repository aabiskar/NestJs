import { Controller, Get, Post, Body, Param,UsePipes,ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto} from './dto/create-user.dto'
import { User } from './user.model';
import { ModeOfContactValidationPipe } from './pipes/user-validation';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    getAllUsers(): Promise<User[]>{
        return this.usersService.getAllUsers()
    }

    @Get('/:id')
    getUser(@Param('id') id:string): Promise<User> {
        return this.usersService.getUserById(id)
    }


    @Post()
    @UsePipes(ValidationPipe)
    postUser(
        @Body('modeOfContact',ModeOfContactValidationPipe) modeOfContact:ModeOfContactValidationPipe,
        @Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.postUser(createUserDto)
    }
}
