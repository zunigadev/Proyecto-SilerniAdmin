import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class LoginAuthDto {
  @IsOptional()
  @IsString()
  code?: string;
  
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  password: string;

  @IsOptional()
  ip?: string = null;
  
  @IsOptional()
  userAgent?: string = null;
}
