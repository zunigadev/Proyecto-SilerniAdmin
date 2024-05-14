import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

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
    getPrueba(@Param('email') email:string) {
        return this.userService.findEmail(email);
    }
    
}
