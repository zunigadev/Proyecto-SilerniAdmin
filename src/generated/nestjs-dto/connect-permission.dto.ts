
import {ApiProperty} from '@nestjs/swagger'




export class ConnectPermissionDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
