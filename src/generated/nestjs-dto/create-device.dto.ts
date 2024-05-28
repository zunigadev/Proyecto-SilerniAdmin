
import {ApiProperty} from '@nestjs/swagger'




export class CreateDeviceDto {
  @ApiProperty({
  type: 'string',
})
deviceType: string ;
@ApiProperty({
  type: 'string',
})
operatingSystem: string ;
@ApiProperty({
  type: 'string',
})
browser: string ;
@ApiProperty({
  type: 'string',
})
uniqueDeviceId: string ;
}
