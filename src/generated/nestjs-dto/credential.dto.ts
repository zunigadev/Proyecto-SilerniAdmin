
import {ApiProperty} from '@nestjs/swagger'


export class CredentialDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
idCredential: number ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
code: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
email: string  | null;
@ApiProperty({
  type: 'boolean',
})
emailVerified: boolean ;
@ApiProperty({
  type: 'string',
})
password: string ;
@ApiProperty({
  type: 'string',
})
repPassword: string ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
refreshTokenId: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
emailTokenId: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
resetPassTokenId: string  | null;
}
