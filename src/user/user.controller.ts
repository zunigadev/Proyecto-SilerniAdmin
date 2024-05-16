import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {} 

    @Get('/')
    getAllUsers() {
    return this.userService.findAll();
     }

    @Get(':id')
    getIDUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findByID(id);
    }

    @Get(':email')
    getEmail(@Param('email') email:string) {
        return this.userService.findByEmail(email);
    }

    //Prueba Registro
    @Post('')
    postUser(@Body() createUser: CreateUserDto) {
        return this.userService.createUser(createUser);
    }
    
}
