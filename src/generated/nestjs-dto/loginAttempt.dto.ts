
import {ApiProperty} from '@nestjs/swagger'


export class LoginAttemptDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
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
}
