
import {ApiProperty} from '@nestjs/swagger'




export class UpdateFilesPostulationDto {
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
