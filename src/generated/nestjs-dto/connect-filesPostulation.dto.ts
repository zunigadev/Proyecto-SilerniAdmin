
import {ApiProperty} from '@nestjs/swagger'




export class ConnectFilesPostulationDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
idFilesPostulation: number ;
}
