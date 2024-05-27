import { BadRequestException, ConflictException, Inject, Injectable, PreconditionFailedException, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { TransactionContext } from 'src/common/contexts/transaction.context';
import { BaseService } from 'src/common/services/base.service';
import { CredentialService } from 'src/credential/credential.service';
import { User } from 'src/generated/nestjs-dto/user.entity';
import { HashingService } from 'src/hashing/hashing.service';
import { LoginAttemptService } from 'src/login-attempt/login-attempt.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../../user/user.service';
import jwtConfig from '../config/jwt.config';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { EmailTokenDto } from './dto/email-token.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterUserDto } from './dto/register-auth.dto';
import { RequestNewEmailTokenDto } from './dto/request-new-email-token.dto';
import { InvalidateRefreshTokenError } from './errors/invalidate-refresh-token.error';
import { TokenIdsStorage } from './token-ids-storage';
import { TokenType } from './enum/token-type.enum';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    protected readonly prismaService: PrismaService,
    private readonly hashingService: HashingService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly tokenIdsStorage: TokenIdsStorage,
    private readonly loginAttemptService: LoginAttemptService,
    private readonly credentialService: CredentialService,
  ) {
    super(prismaService)
  }

  async logIn(loginDto: LoginAuthDto, txContext?: TransactionContext) {

    let user = null;
    try {

      const { code, password } = loginDto;

      user = await this.userService.findByCode(code, txContext);

      if (!user) {
        throw new UnauthorizedException('Invalid code');
      }

      const userpassword = user.credential.password;
      const isPasswordValid = await this.hashingService.compare(password, userpassword);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }

      await this.loginAttemptService.logLoginAttempt(user.idUser, {
        username: user.name,
        success: true,
        ipAddress: loginDto.ip,
        userAgent: loginDto.userAgent,
      }, txContext);

      const tokens = await this.generateTokens(user);
      return tokens
    } catch (error) {
      await this.loginAttemptService.logLoginAttempt(user.idUser, {
        username: user.name,
        success: false,
        ipAddress: loginDto.ip,
        userAgent: loginDto.userAgent,
      }, txContext);
      throw error
    }
  }

  async register(registerDto: RegisterUserDto, txContext?: TransactionContext) {
    if (txContext) {
      const newUser = await this.userService.createUser(registerDto, txContext);

      return this.generateTokenToValidateEmail(newUser, txContext);
    }

    try {

      const prisma = this.getPrismaClient()

      return await prisma.$transaction(async (tx: PrismaClient) => {
        const txContext = new TransactionContext(tx)

        // verify if exists credential with email sent
        const credential = await this.credentialService.findByEmail(registerDto.credential.email, txContext)

        if (credential) {
          throw new ConflictException('Email already registered');
        }
        //

        const newUser = await this.userService.createUser(registerDto, txContext);

        return this.generateTokenToValidateEmail(newUser, txContext);

      })
    } catch (error) {
      throw error
    }


  }

  async generateTokens(user: User, txContext?: TransactionContext) {

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
    await this.tokenIdsStorage.insert(user.idUser, refreshTokenId, TokenType.REFRESH_TOKEN, txContext);
    return {
      accessToken,
      refreshToken,
    };
  }

  async generateTokenToValidateEmail(user: User, txContext?: TransactionContext) {
    const emailTokenId = randomUUID();
    const emailToken = await this.signToken(user.idUser, this.jwtConfiguration.emailTokenTtl, {
      emailTokenId
    })
    await this.tokenIdsStorage.insert(user.idUser, emailTokenId, TokenType.VERIFY_EMAIL, txContext);

    return emailToken
  }

  async requestNewEmailToken(requestNewEmailTokenDto: RequestNewEmailTokenDto, txContext?: TransactionContext) {
    const { email } = requestNewEmailTokenDto;
    const user = await this.userService.findByEmail(email, txContext);
    if (!user) {
      throw new BadRequestException('User with this email does not exist');
    }
    if (user.credential.emailVerified) {
      throw new BadRequestException('Email already verified');
    }

    return this.generateTokenToValidateEmail(user, txContext);
  }

  async verifyEmailToken(emailTokenDto: EmailTokenDto, txContext?: TransactionContext) {
    try {
      const { sub, emailTokenId } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, "sub"> & { emailTokenId: string }
      >(emailTokenDto.emailToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
      const user = await this.userService.findById(sub, txContext);

      if (user.credential.emailVerified) {
        throw new PreconditionFailedException("Email already verified");
      }

      const isValid = await this.tokenIdsStorage.validate(
        user.idUser,
        emailTokenId,
        TokenType.VERIFY_EMAIL,
        txContext,
      );
      if (isValid) {
        await this.tokenIdsStorage.invalidate(user.credential.idCredential, TokenType.VERIFY_EMAIL, txContext);

        await this.userService.verifyEmail(user.credential.idCredential, txContext);

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

  async refreshTokens(refreshTokenDto: RefreshTokenDto, txContext?: TransactionContext) {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, "sub"> & { refreshTokenId: string }
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
      const user = await this.userService.findById(sub, txContext);

      const isValid = await this.tokenIdsStorage.validate(
        user.idUser,
        refreshTokenId,
        TokenType.REFRESH_TOKEN,
        txContext
      );
      if (isValid) {
        await this.tokenIdsStorage.invalidate(user.credential.idCredential, TokenType.REFRESH_TOKEN, txContext);
      } else {
        throw new Error("Refresh Token is invalid");
      }
      return this.generateTokens(user, txContext);
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
