
import {ApiProperty} from '@nestjs/swagger'




export class CreateCredentialDto {
  @ApiProperty({
  type: 'string',
})
password: string ;
@ApiProperty({
  type: 'string',
})
repPassword: string ;
}
