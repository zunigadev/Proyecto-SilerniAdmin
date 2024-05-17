
import {ApiProperty} from '@nestjs/swagger'




export class CreateSequenceCounterDto {
  @ApiProperty({
  type: 'string',
})
name: string ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
lastUsed: number ;
}
