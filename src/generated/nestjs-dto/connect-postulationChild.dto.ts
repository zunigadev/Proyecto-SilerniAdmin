
import {ApiProperty} from '@nestjs/swagger'




export class ConnectPostulationChildDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
  nullable: true,
})
idPostulationChild?: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
  nullable: true,
})
credentialId?: number ;
}
