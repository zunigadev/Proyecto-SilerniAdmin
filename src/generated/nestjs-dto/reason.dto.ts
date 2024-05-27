
import {ApiProperty} from '@nestjs/swagger'


export class ReasonDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
idReason: number ;
@ApiProperty({
  type: 'string',
})
argument: string ;
}
