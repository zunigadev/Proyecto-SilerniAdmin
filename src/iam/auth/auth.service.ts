import { BadRequestException, Inject, Injectable, PreconditionFailedException, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { User } from 'src/generated/nestjs-dto/user.entity';
import { HashingService } from 'src/hashing/hashing.service';
import { LoginAttemptService } from 'src/login-attempt/login-attempt.service';
import { UserService } from '../../user/user.service';
import jwtConfig from '../config/jwt.config';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { EmailTokenDto } from './dto/email-token.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterUserDto } from './dto/register-auth.dto';
import { InvalidateRefreshTokenError } from './errors/invalidate-refresh-token.error';
import { RefreshTokenIdsStorage } from './refresh-token-ids-storage';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
    private readonly loginAttemptService: LoginAttemptService,
  ) { }

  async logIn(loginDto: LoginAuthDto) {

    let user = null;
    try {

      const { code, password } = loginDto;

      user = await this.userService.findByCode(code);

      if (!user) {
        throw new UnauthorizedException('Invalid code');
      }
      console.log(code); // Prueba de consola
      const userpassword = user.credential.password;
      const isPasswordValid = await this.hashingService.compare(password, userpassword);

      console.log(password, userpassword); // Prueba de consola
      console.log(isPasswordValid); // Prueba de consola

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }

      await this.loginAttemptService.logLoginAttempt(user.idUser, {
        username: user.name,
        success: true,
        ipAddress: loginDto.ip,
        userAgent: loginDto.userAgent,
      });

      const tokens = await this.generateTokens(user);
      return tokens
    } catch (error) {
      await this.loginAttemptService.logLoginAttempt(user.idUser, {
        username: user.name,
        success: false,
        ipAddress: loginDto.ip,
        userAgent: loginDto.userAgent,
      });
      throw error
    }
  }

  async register(registerDto: RegisterUserDto) {
    // const { email, code } = registerDto.credential;

    // const passwordHash = await hash(password, 10);

    // registerDto.credential.password = passwordHash;
    // registerDto = {...registerDto,credential:{email, code/*, password:passwordHash,repPassword:passwordHash}*/}

    const newUser = await this.userService.createUser(registerDto);

    return this.generateTokenToValidateEmail(newUser);
  }

  async generateTokens(user: User) {
    const refreshTokenId = randomUUID();
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.idUser,
        this.jwtConfiguration.accessTokenTtl,
        {
          email: user.credential.email,
          code: user.credential.code,
          // role: user.role
        },
      ),
      this.signToken(user.idUser, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId,
      }),
    ]);
    await this.refreshTokenIdsStorage.insert(user.idUser, refreshTokenId);
    return {
      accessToken,
      refreshToken,
    };
  }

  async generateTokenToValidateEmail(user: User) {
    const emailTokenId = randomUUID();
    const emailToken = await this.signToken(user.idUser, this.jwtConfiguration.emailTokenTtl, {
      emailTokenId
    })
    await this.refreshTokenIdsStorage.insert(user.idUser, emailTokenId);

    return emailToken
  }

  async verifyEmailToken(emailTokenDto: EmailTokenDto) {
    try {
      const { sub, emailTokenId } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, "sub"> & { emailTokenId: string }
      >(emailTokenDto.emailToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
      const user = await this.userService.findById(sub);

      if (user.credential.verifyEmail) {
        throw new PreconditionFailedException("Email already verified");
      }

      const isValid = await this.refreshTokenIdsStorage.validate(
        user.idUser,
        emailTokenId,
      );
      if (isValid) {
        await this.refreshTokenIdsStorage.invalidate(user.credential.idCredential);

        await this.userService.verifyEmail(user.credential.idCredential);

      } else {
        throw new BadRequestException("Email Token is invalid");
      }
      return {
        success: true,
      }
    } catch (err) {
      if (err instanceof InvalidateRefreshTokenError) {
        throw new UnauthorizedException("Access denied");
      }
      throw err
    }
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, "sub"> & { refreshTokenId: string }
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
      const user = await this.userService.findById(sub);

      const isValid = await this.refreshTokenIdsStorage.validate(
        user.idUser,
        refreshTokenId,
      );
      if (isValid) {
        await this.refreshTokenIdsStorage.invalidate(user.credential.idCredential);
      } else {
        throw new Error("Refresh Token is invalid");
      }
      return this.generateTokens(user);
    } catch (err) {
      if (err instanceof InvalidateRefreshTokenError) {
        throw new UnauthorizedException("Access denied");
      }
      throw new UnauthorizedException();
    }
  }

  private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }
}
