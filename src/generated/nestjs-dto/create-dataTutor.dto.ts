
import {ApiProperty} from '@nestjs/swagger'




export class CreateDataTutorDto {
  @ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
name?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
lastName?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
documentType?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
document?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
phone?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
relationship?: string  | null;
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
gender?: string  | null;
}
