
import {ApiProperty} from '@nestjs/swagger'


export class CredentialDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
idCredential: number ;
@ApiProperty({
  type: 'string',
})
password: string ;
@ApiProperty({
  type: 'string',
})
repPassword: string ;
}
