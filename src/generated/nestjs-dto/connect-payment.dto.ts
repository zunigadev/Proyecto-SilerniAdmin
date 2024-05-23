
import {ApiProperty} from '@nestjs/swagger'




export class ConnectPaymentDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
