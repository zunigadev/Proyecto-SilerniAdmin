
import {ApiProperty} from '@nestjs/swagger'


export class PaymentDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'string',
})
stripeChargeId: string ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
amount: number ;
@ApiProperty({
  type: 'string',
})
currency: string ;
@ApiProperty({
  type: 'string',
})
description: string ;
@ApiProperty({
  type: 'string',
})
status: string ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
customerEmail: string  | null;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
created: Date ;
}
