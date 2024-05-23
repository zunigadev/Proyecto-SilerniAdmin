import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusChildDto {
  @ApiProperty({
    type: 'string',
    required: true,
    nullable: false,
    default: 'sending',
  })
  status: string | null = 'sending';

  @ApiProperty({
    type: 'string',
  })
  argument: string ;
}
