
import {ApiProperty} from '@nestjs/swagger'




export class UpdateDeviceDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
deviceType?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
operatingSystem?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
browser?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
uniqueDeviceId?: string ;
}
