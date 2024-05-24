
import {ApiProperty} from '@nestjs/swagger'




export class CreateCredentialDto {
  @ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
code?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
email?: string  | null;
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
  required: false,
  nullable: true,
})
refreshTokenId?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
emailTokenId?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
resetPassTokenId?: string  | null;
}
