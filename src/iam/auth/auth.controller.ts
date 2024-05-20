import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterUserDto } from './dto/register-auth.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from 'src/common/enums/auth-type.enum';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Auth(AuthType.None)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  logIn(@Body() loginDto: LoginAuthDto) {
    return this.authService.logIn(loginDto);
  }

  // Pruebas
  @Post('register')
  registerUser(@Body() registerDto: RegisterUserDto) {
    return this.authService.register(registerDto);
  }

  @Post("refresh-tokens")
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }

}
