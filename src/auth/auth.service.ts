import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcryptjs from "bcryptjs";
import { hash } from 'bcryptjs';
import { RegisterUserDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
   constructor(private userService: UserService) {}

    async logIn(loginDto: LoginAuthDto ) {

        const {email,password} = loginDto
        const user = await this.userService.findByEmail(email);
        

        if (!user) {
            throw new UnauthorizedException("Invalid email");
        }
        console.log(email) // Prueba de consola
        const userpassword = user.credential.password;
        const isPasswordValid = await bcryptjs.compareSync(password,userpassword);

        console.log(password, userpassword) // Prueba de consola
        console.log(isPasswordValid) // Prueba de consola

        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid password");
          }

        return {
            user
        };
    }

    // Pruebas

    async register(registerDto: RegisterUserDto) {

        const { password } = registerDto.credential;
        const passwordHash = await hash(password, 10);

        registerDto.credential.password = passwordHash;
        registerDto = {...registerDto,credential:{password:passwordHash,repPassword:passwordHash}}
        
        return this.userService.createUser(registerDto)

    }

}

