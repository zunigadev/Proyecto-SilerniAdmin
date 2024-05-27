import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {

    @IsNotEmpty()
    resetToken: string;

    @IsString()
    @Transform(({ value }) => value.trim())
    password: string;

    @IsString()
    @Transform(({ value }) => value.trim())
    repPassword: string;
}