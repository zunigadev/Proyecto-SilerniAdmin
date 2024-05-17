
import {ApiProperty} from '@nestjs/swagger'




export class UpdateCredentialDto {
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
  required: false,
  nullable: true,
})
password?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
repPassword?: string  | null;
}
