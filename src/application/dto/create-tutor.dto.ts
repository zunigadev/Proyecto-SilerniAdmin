import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateTutorDto {
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsNotEmpty()
  lastName: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsNotEmpty()
  documentType: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsNotEmpty()
  document: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsNotEmpty()
  phone: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsNotEmpty()
  relationship: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    type: 'string',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  userAgent?: string;
}