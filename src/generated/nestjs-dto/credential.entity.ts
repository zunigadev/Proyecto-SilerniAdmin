
import {ApiProperty} from '@nestjs/swagger'
import {User} from './user.entity'


export class Credential {
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
@ApiProperty({
  required: false,
  nullable: true,
})
user?: User  | null;
}
