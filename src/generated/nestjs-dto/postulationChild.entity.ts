
import {ApiProperty} from '@nestjs/swagger'
import {DataTutor} from './dataTutor.entity'
import {FilesPostulation} from './filesPostulation.entity'
import {Credential} from './credential.entity'
import {Reason} from './reason.entity'


export class PostulationChild {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
idPostulationChild: number ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
name: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
paternalLastName: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
maternalLastName: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
phone: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
birthDate: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
email: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
address: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
gender: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
grade: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
level: string  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
dataTutorIdDataTutor: number ;
@ApiProperty({
  type: 'string',
})
status: string ;
@ApiProperty({
  required: false,
})
dataTutor?: DataTutor ;
@ApiProperty({
  isArray: true,
  required: false,
})
filesPostulations?: FilesPostulation[] ;
@ApiProperty({
  required: false,
  nullable: true,
})
credential?: Credential  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  nullable: true,
})
credentialId: number  | null;
@ApiProperty({
  isArray: true,
  required: false,
})
reasons?: Reason[] ;
}
