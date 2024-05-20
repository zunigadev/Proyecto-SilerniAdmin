import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { UserService } from '../../user/user.service';
import jwtConfig from '../config/jwt.config';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterUserDto } from './dto/register-auth.dto';
import { InvalidateRefreshTokenError } from './errors/invalidate-refresh-token.error';
import { RefreshTokenIdsStorage } from './refresh-token-ids-storage';
import { HashingService } from 'src/hashing/hashing.service';
import { User } from 'src/generated/nestjs-dto/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
  ) { }

  async logIn(loginDto: LoginAuthDto) {
    const { code, password } = loginDto;

    const user = await this.userService.findByCode(code);

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

    return await this.generateTokens(user);
  }

  async register(registerDto: RegisterUserDto) {
    // const { email, code } = registerDto.credential;

    // const passwordHash = await hash(password, 10);

    // registerDto.credential.password = passwordHash;
    // registerDto = {...registerDto,credential:{email, code/*, password:passwordHash,repPassword:passwordHash}*/}

    return this.userService.createUser(registerDto);
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
        await this.refreshTokenIdsStorage.invalidate(user.idUser);
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
