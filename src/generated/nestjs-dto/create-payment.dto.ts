
import {ApiProperty} from '@nestjs/swagger'




export class CreatePaymentDto {
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
  required: false,
  nullable: true,
})
customerEmail?: string  | null;
}
