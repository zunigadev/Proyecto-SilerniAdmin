
import {ApiProperty} from '@nestjs/swagger'




export class ConnectDataTutorDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
  nullable: true,
})
idDataTutor?: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
  nullable: true,
})
credentialId?: number ;
}
