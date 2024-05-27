
import {ApiProperty} from '@nestjs/swagger'




export class UpdatePaymentDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
stripeChargeId?: string ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
})
amount?: number ;
@ApiProperty({
  type: 'string',
  required: false,
})
currency?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
description?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
status?: string ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
customerEmail?: string  | null;
}
