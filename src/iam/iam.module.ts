import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { CaslModule } from "src/casl/casl.module";
import { HashingModule } from "src/hashing/hashing.module";
import { LoginAttemptModule } from "src/login-attempt/login-attempt.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { AccessTokenGuard } from "./auth/guards/access-token.guard";
import { AuthenticationGuard } from "./auth/guards/authentication.guard";
import { RefreshTokenIdsStorage } from "./auth/refresh-token-ids-storage";
import { PoliciesGuard } from "./authorization/guards/policies.guard";
import jwtConfig from "./config/jwt.config";
import { CredentialModule } from "src/credential/credential.module";

@Module({
  imports: [
    PrismaModule,
    UserModule,
    CredentialModule,
    HashingModule,
    CaslModule,
    LoginAttemptModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard,
    },
    RefreshTokenIdsStorage,
    AuthService,
    AccessTokenGuard,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class IamModule { }
