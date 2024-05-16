
import {ApiProperty} from '@nestjs/swagger'




export class UpdateCredentialDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
password?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
repPassword?: string ;
}
