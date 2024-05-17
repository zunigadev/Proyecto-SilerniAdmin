
import {ApiProperty} from '@nestjs/swagger'




export class ConnectSequenceCounterDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
  nullable: true,
})
id?: number ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
name?: string ;
}
