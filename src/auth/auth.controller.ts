import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    logIn(@Body() loginDto: LoginAuthDto) {
      return this.authService.logIn(loginDto);
    }

    @Post('register')
    registerUser(@Body() registerDto: RegisterAuthDto) {
      console.log({ body: registerDto})
    }

}
