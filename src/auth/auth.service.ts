import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcryptjs from "bcryptjs";

@Injectable()
export class AuthService {
   constructor(private userService: UserService) {}

    async logIn({email, password}: LoginAuthDto ) {

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
}

//     const userEmail = await this.userService.findEmail(email);
        
    //    if (userEmail?.credential.password !== password) {
    //     console.log('false') //prueba
    //     throw new UnauthorizedException();
    //    }
    //    console.log('true') //prueba
    //    const result = {email, password}
    //    return result;