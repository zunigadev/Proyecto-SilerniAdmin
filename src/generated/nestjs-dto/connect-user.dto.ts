
import {ApiProperty} from '@nestjs/swagger'




export class ConnectUserDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
  nullable: true,
})
idUser?: number ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
email?: string ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
  nullable: true,
})
credentialId?: number ;
}
