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

@Module({
  imports: [
    PrismaModule,
    UserModule,
    HashingModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    RefreshTokenIdsStorage,
    AuthService,
    AuthorizationService,
  ],
  controllers: [AuthController],
})
export class IamModule { }
