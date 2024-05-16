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

        const isPasswordValid = await bcryptjs.compareSync(password,user.credential.password);

        console.log(typeof password, typeof user.credential.password)
        console.log(isPasswordValid)

        // if (!isPasswordValid) {
        //     throw new UnauthorizedException("Invalid password");
        //   }

        // return {
        //     email: user.user.email,
        // };
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

