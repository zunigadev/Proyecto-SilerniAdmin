import { Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('singIn/:email/:password')
    singIn(@Param('email') email: string, @Param('password') password: string) {
      return this.authService.signIn(email,password);
    }

}
