
import {ApiProperty} from '@nestjs/swagger'


export class AddressDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
city: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
country: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
line1: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
line2: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
postalCode: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
state: string  | null;
}
