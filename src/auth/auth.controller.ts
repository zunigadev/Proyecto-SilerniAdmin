import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterUserDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    logIn(@Body() loginDto: LoginAuthDto) {
      return this.authService.logIn(loginDto);
    }

    // Pruebas
    @Post('register')
    registerUser(@Body() registerDto: RegisterUserDto) {
      return this.authService.register(registerDto)
    }

}
