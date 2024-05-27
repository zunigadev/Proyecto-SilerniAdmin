
import {ApiProperty} from '@nestjs/swagger'
import {User} from './user.entity'


export class LoginAttempt {
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
location: string ;
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
  type: 'boolean',
})
success: boolean ;
@ApiProperty({
  type: 'string',
  nullable: true,
})
ipAddress: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
userAgent: string  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
userId: number ;
@ApiProperty({
  required: false,
})
user?: User ;
}
