
import {ApiProperty} from '@nestjs/swagger'




export class ConnectReasonDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
idReason: number ;
}
