
import {Prisma} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {Address} from './address.entity'


export class FullStripePayment {
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
  type: 'integer',
  format: 'int32',
  nullable: true,
})
amountCaptured: number  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  nullable: true,
})
amountRefunded: number  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  nullable: true,
})
applicationFeeAmount: number  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
balanceTransaction: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
billingDetailsName: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
billingDetailsEmail: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
billingDetailsPhone: string  | null;
@ApiProperty({
  required: false,
  nullable: true,
})
billingDetailsAddress?: Address  | null;
@ApiProperty({
  type: 'string',
})
currency: string ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
customer: string  | null;
@ApiProperty({
  type: 'string',
})
description: string ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
failureCode: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
failureMessage: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
invoice: string  | null;
@ApiProperty({
  nullable: true,
})
metadata: Prisma.JsonValue  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
paymentIntent: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
paymentMethod: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
receiptEmail: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
receiptUrl: string  | null;
@ApiProperty({
  type: 'boolean',
})
refunded: boolean ;
@ApiProperty({
  type: 'string',
})
status: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
created: Date ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  nullable: true,
})
addressId: number  | null;
}
