import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
   constructor(private userService: UserService) {}

    async signIn(email: string, password: string): Promise<any> {
        
        const userEmail = await this.userService.findEmail(email);
        
       if (userEmail?.credential.password !== password) {
        console.log('false') //prueba
        throw new UnauthorizedException();
       }
       console.log('true') //prueba
       const result = {email, password}
       return result;
       
    }
}
