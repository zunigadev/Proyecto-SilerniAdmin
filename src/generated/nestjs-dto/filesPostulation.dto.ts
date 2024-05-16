
import {ApiProperty} from '@nestjs/swagger'


export class FilesPostulationDto {
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
}
