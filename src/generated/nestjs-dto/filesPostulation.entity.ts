
import {ApiProperty} from '@nestjs/swagger'
import {PostulationChild} from './postulationChild.entity'


export class FilesPostulation {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
idFilesPostulation: number ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
name: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
link: string  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
postulationChildIdPostulationChild: number ;
@ApiProperty({
  required: false,
})
postulationChild?: PostulationChild ;
}
