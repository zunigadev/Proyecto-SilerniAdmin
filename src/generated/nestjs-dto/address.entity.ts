
import {ApiProperty} from '@nestjs/swagger'
import {FullStripePayment} from './fullStripePayment.entity'


export class Address {
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
@ApiProperty({
  isArray: true,
  required: false,
})
FullStripePayment?: FullStripePayment[] ;
}
