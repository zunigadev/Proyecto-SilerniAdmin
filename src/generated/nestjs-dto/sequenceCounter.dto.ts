
import {ApiProperty} from '@nestjs/swagger'


export class SequenceCounterDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
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
