
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class CreateFullStripePaymentDto {
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
  type: 'integer',
  format: 'int32',
  required: false,
  nullable: true,
})
amountCaptured?: number  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
  nullable: true,
})
amountRefunded?: number  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
  nullable: true,
})
applicationFeeAmount?: number  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
balanceTransaction?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
billingDetailsName?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
billingDetailsEmail?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
billingDetailsPhone?: string  | null;
@ApiProperty({
  type: 'string',
})
currency: string ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
customer?: string  | null;
@ApiProperty({
  type: 'string',
})
description: string ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
failureCode?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
failureMessage?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
invoice?: string  | null;
@ApiProperty({
  required: false,
  nullable: true,
})
metadata?: Prisma.InputJsonValue  | Prisma.NullableJsonNullValueInput;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
paymentIntent?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
paymentMethod?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
receiptEmail?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
receiptUrl?: string  | null;
@ApiProperty({
  type: 'string',
})
status: string ;
}
