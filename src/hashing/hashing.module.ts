import { Module } from "@nestjs/common";
import { HashingService } from "./hashing.service";
import { BcryptService } from "./bcrypt.service";

@Module({
    providers: [
        {
            provide: HashingService,
            useClass: BcryptService,
        }
    ],
    exports: [
        {
            provide: HashingService,
            useClass: BcryptService,
        }
    ],
})
export class HashingModule { }
