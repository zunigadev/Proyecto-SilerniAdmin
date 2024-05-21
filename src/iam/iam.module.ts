import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { HashingModule } from "src/hashing/hashing.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { RefreshTokenIdsStorage } from "./auth/refresh-token-ids-storage";
import { AuthorizationService } from './authorization/authorization.service';
import jwtConfig from "./config/jwt.config";
import { CaslModule } from "src/casl/casl.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthenticationGuard } from "./auth/guards/authentication.guard";
import { PoliciesGuard } from "./authorization/guards/policies.guard";
import { AccessTokenGuard } from "./auth/guards/access-token.guard";
import { LoginAttemptModule } from "src/login-attempt/login-attempt.module";

@Module({
  imports: [
    PrismaModule,
    UserModule,
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
    AuthorizationService,
  ],
  controllers: [AuthController],
})
export class IamModule { }
