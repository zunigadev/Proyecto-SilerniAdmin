import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateCredentialDto {
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
   
    readonly email?: string;
    
    readonly code?: string;
    
    password?: string;

    repPassword?: string;
  };
}