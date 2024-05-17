
import {ApiProperty} from '@nestjs/swagger'




export class ConnectCredentialDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
  nullable: true,
})
idCredential?: number ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
code?: string ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
email?: string ;
}
