
import {ApiProperty} from '@nestjs/swagger'
import {PostulationChild} from './postulationChild.entity'


export class Reason {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
idReason: number ;
@ApiProperty({
  type: 'string',
})
argument: string ;
@ApiProperty({
  required: false,
  nullable: true,
})
postulationChild?: PostulationChild  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  nullable: true,
})
postulationChildId: number  | null;
}
