import { ApiProperty } from '@nestjs/swagger';
import { CreatePostulationChildDto } from './create-postulationChild.dto';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateTutorDto {
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  name?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  lastName?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  documentType?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  document?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  phone?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  relationship?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  email?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  gender?: string | null;

  @ApiProperty({
    type: 'string',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  postulationChildren?: CreatePostulationChildDto[];

  userAgent?: string;
}