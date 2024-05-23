
import {ApiProperty} from '@nestjs/swagger'




export class UpdateAddressDto {
  @ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
city?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
country?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
line1?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
line2?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
postalCode?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
state?: string  | null;
}
