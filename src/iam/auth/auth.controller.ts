import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthType } from 'src/common/enums/auth-type.enum';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterUserDto } from './dto/register-auth.dto';
import { EmailTokenDto } from './dto/email-token.dto';
import { RequestNewEmailTokenDto } from './dto/request-new-email-token.dto';
import { EmailDto } from './dto/email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Auth(AuthType.None)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async logIn(@Req() req: Request, @Body() loginDto: LoginAuthDto) {
    loginDto.ip = req.ip;
    loginDto.userAgent = req.headers['user-agent'];
    return await this.authService.logIn(loginDto);
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

  @Post("verify-email")
  @HttpCode(HttpStatus.OK)
  verifyEmailToken(@Body() emailTokenDto: EmailTokenDto) {
    return this.authService.verifyEmailToken(emailTokenDto);
  }

  @Post('request-new-email-token')
  @HttpCode(HttpStatus.OK)
  requestNewEmailToken(@Body() requestNewEmailTokenDto: RequestNewEmailTokenDto) {
    return this.authService.requestNewEmailToken(requestNewEmailTokenDto);
  }

  @Post("token-for-reset")
  @HttpCode(HttpStatus.OK)
  tokenForResetPassword(@Body() email: EmailDto) {
    return this.authService.generateTokenResetPassword(email)
  }

  @Post("reset-password")
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() newPassword: ResetPasswordDto) {
    // console.log(req, newPassword)
    return this.authService.resetPassword(newPassword);
  }


}
