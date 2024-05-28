
import {ApiProperty} from '@nestjs/swagger'
import {User} from './user.entity'


export class Device {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
timestamp: Date ;
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
  type: 'integer',
  format: 'int32',
})
userId: number ;
@ApiProperty({
  required: false,
})
user?: User ;
@ApiProperty({
  type: 'string',
})
uniqueDeviceId: string ;
}
