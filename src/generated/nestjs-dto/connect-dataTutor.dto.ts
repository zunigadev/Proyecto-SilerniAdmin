
import {ApiProperty} from '@nestjs/swagger'




export class ConnectDataTutorDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
idDataTutor: number ;
}
