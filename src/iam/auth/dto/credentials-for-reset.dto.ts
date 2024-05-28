import { IsEmail, IsOptional, IsString } from "class-validator";

export class CredentialsForResetDto {
    
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    code? : string;
    
}