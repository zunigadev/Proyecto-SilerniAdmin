
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
  nullable: true,
})
code: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
email: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
password: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
repPassword: string  | null;
@ApiProperty({
  required: false,
  nullable: true,
})
user?: User  | null;
}
