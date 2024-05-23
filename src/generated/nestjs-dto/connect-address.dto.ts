
import {ApiProperty} from '@nestjs/swagger'




export class ConnectAddressDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
