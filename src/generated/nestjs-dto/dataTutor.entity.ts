
import {ApiProperty} from '@nestjs/swagger'
import {PostulationChild} from './postulationChild.entity'


export class DataTutor {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
idDataTutor: number ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
name: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
lastName: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
documentType: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
document: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
phone: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
relationship: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
email: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
gender: string  | null;
@ApiProperty({
  isArray: true,
  required: false,
})
postulationChild?: PostulationChild[] ;
}
