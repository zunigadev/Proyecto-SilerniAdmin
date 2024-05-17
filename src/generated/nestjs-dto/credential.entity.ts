
import {ApiProperty} from '@nestjs/swagger'
import {User} from './user.entity'
import {DataTutor} from './dataTutor.entity'
import {PostulationChild} from './postulationChild.entity'


export class Credential {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
idCredential: number ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
code: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
email: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
password: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
repPassword: string  | null;
@ApiProperty({
  required: false,
  nullable: true,
})
user?: User  | null;
@ApiProperty({
  required: false,
  nullable: true,
})
dataTutor?: DataTutor  | null;
@ApiProperty({
  required: false,
  nullable: true,
})
postulationChild?: PostulationChild  | null;
}
