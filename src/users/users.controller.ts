import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto} from './dto/create-user.dto'
import { User } from './user.model';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    getAllusers(){
        return this.usersService.getAllUsers()
    }

    @Get('/:id')
    getUser(@Param('id') id:string){
        return this.usersService.getUserById(id)
    }


    @Post()
    postUser(@Body() createUserDto: CreateUserDto) {
        console.log("Request body", createUserDto)
        return this.usersService.postUser(createUserDto)
    }
}
