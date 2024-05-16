
import {ApiProperty} from '@nestjs/swagger'




export class CreateFilesPostulationDto {
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
link?: string  | null;
}
