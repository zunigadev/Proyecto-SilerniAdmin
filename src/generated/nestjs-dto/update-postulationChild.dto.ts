import {ApiProperty} from '@nestjs/swagger'

export class UpdatePostulationChildDto {
  @ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
name?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
paternalLastName?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
maternalLastName?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
phone?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
birthDate?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
email?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
address?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
gender?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
justification?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
grade?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
postulationChildCol?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
level?: string  | null;
}
