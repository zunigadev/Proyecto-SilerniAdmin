import { Module } from "@nestjs/common";
import { ApplicationController } from "./application.controller";
import { ApplicationService } from "./application.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { CredentialModule } from "src/credential/credential.module";

@Module({
    imports: [PrismaModule, CredentialModule],
    controllers: [ApplicationController],
    providers: [ApplicationService],
})

export class ApplicationModule {}