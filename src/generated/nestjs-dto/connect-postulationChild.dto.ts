
import {ApiProperty} from '@nestjs/swagger'




export class ConnectPostulationChildDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
idPostulationChild: number ;
}
