
import {ApiProperty} from '@nestjs/swagger'




export class UpdateSequenceCounterDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
name?: string ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
})
lastUsed?: number ;
}
