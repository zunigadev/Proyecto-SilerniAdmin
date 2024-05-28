import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, PreconditionFailedException, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { TransactionContext } from 'src/common/contexts/transaction.context';
import { BaseService } from 'src/common/services/base.service';
import { CredentialService } from 'src/credential/credential.service';
import { DeviceService } from 'src/device/device.service';
import { User } from 'src/generated/nestjs-dto/user.entity';
import { HashingService } from 'src/hashing/hashing.service';
import { LoginAttemptService } from 'src/login-attempt/login-attempt.service';
import { MailerService } from 'src/mailer/mailer.service';
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
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CredentialsForResetDto } from './dto/credentials-for-reset.dto';
import { RolesService } from 'src/roles/roles.service';

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
    private readonly deviceService: DeviceService,
    private readonly credentialService: CredentialService,
    private readonly mailerService: MailerService,
    private readonly rolesService: RolesService,
  ) {
    super(prismaService)
  }

  async logIn(loginDto: LoginAuthDto, txContext?: TransactionContext) {

    let user = null;

    try {

      const { code, email, password } = loginDto;


      if (!email && !code) {
        throw new BadRequestException('Error: email or code must be provided');
      }

      if (email) {
        user = await this.userService.findByEmail(email, txContext);
      } else {
        user = await this.userService.findByCode(code, txContext);
      }

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const userpassword = user.credential.password;
      const isPasswordValid = await this.hashingService.compare(password, userpassword);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }

      const tokens = await this.generateTokens(user);

      await Promise.all([
        this.deviceService.registerDevice({
          userAgent: loginDto.userAgent,
          userId: user.idUser,
        }),
        this.loginAttemptService.logLoginAttempt({
          ip: loginDto.ip,
          success: true,
          userAgent: loginDto.userAgent,
          userId: user.idUser,
        })
      ])

      return tokens

    } catch (error) {

      if (user) {

        await this.loginAttemptService.logLoginAttempt({
          ip: loginDto.ip,
          success: false,
          userAgent: loginDto.userAgent,
          userId: user.idUser,
        });
      }
      throw error
    }
  }
  async txRegister(registerDto: RegisterUserDto) {
    try {
      return await this.prisma.$transaction(async (tx: PrismaClient) => {
        const txContext = new TransactionContext(tx)

        return this.register(registerDto, txContext)
      })
    } catch (error) {

    }
  }

  async register(registerDto: RegisterUserDto, txContext?: TransactionContext) {

    // verify if exists credential with email sent
    const credential = await this.credentialService.findByEmail(registerDto.credential.email, txContext)

    if (credential) {
      throw new ConflictException('Email already registered');
    }
    //

    const newUser = await this.userService.createUser(registerDto, txContext)

    // asign roles to user
    if (registerDto.rolesId && registerDto.rolesId.length > 0) {
      await this.rolesService.assignRolesToUser(newUser.idUser, registerDto.rolesId, txContext)
    }

    const emailToken = await this.generateTokenToValidateEmail(newUser, txContext);

    // register device and send email
    await Promise.all([
      this.mailerService.sendConfirmEmail(newUser, emailToken),
      this.deviceService.registerDevice({
        userAgent: registerDto.userAgent,
        userId: newUser.idUser,

      }, txContext)
    ])

    return {
      success: true
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

  async generateTokenResetPassword(credforpassDto: CredentialsForResetDto, txContext?: TransactionContext) {

    let user = null;
    const { email, code } = credforpassDto;

    if (!email && !code) {
      throw new BadRequestException('Error: email or code must be provided')
    }
    
    
    if (email) {
      user = await this.userService.findByEmail(email, txContext);
    } else {
      user = await this.userService.findByCode(code, txContext);
    }
    

    if (!user) {
      throw new NotFoundException('Invalid code or Email')
    }


    const passwordTokenId = randomUUID();
    const passwordRestartToken = await this.signToken(user.idUser, this.jwtConfiguration.resetPasswordTokenTtl, {
      passwordTokenId
    })

    await this.tokenIdsStorage.insert(user.idUser, passwordTokenId, TokenType.RESET_PASSWORD, txContext)

    return passwordRestartToken;
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

  async resetPassword(resetTokenDto: ResetPasswordDto, txContext?: TransactionContext) {
    try {
      const { sub, passwordTokenId } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, "sub"> & { passwordTokenId: string }
      >(resetTokenDto.resetToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
      const user = await this.userService.findById(sub, txContext);

      // if (user.credential.emailVerified) {
      //   throw new PreconditionFailedException("Email already verified");
      // }

      const isValid = await this.tokenIdsStorage.validate(
        user.idUser,
        passwordTokenId,
        TokenType.RESET_PASSWORD,
        txContext,
      );
      if (isValid) {
        await this.tokenIdsStorage.invalidate(user.credential.idCredential, TokenType.RESET_PASSWORD, txContext);

        await this.userService.changePassword(user.credential.idCredential, resetTokenDto.password, txContext);

      } else {
        throw new BadRequestException("Invalid Token");
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
