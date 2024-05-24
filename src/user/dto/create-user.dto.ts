import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly p_surname: string;

  @IsString()
  readonly m_surname: string;

  @IsString()
  status: string;

  @IsOptional() // Marca como opcional
  credential: {
   
    email?: string;

    
    code?: string;

    
    password?: string;


    repPassword?: string;
  };
}
