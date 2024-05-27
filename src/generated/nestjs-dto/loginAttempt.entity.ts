
import {ApiProperty} from '@nestjs/swagger'
import {User} from './user.entity'


export class LoginAttempt {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  nullable: true,
})
userId: number  | null;
@ApiProperty({
  type: 'string',
})
username: string ;
@ApiProperty({
  type: 'string',
  format: 'date-time',
})
timestamp: Date ;
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
  required: false,
  nullable: true,
})
user?: User  | null;
}
