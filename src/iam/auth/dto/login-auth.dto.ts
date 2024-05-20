import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  code: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  password: string;
}
