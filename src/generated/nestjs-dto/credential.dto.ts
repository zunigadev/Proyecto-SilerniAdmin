
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
verifyEmail: boolean ;
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
tokenId: string  | null;
}
