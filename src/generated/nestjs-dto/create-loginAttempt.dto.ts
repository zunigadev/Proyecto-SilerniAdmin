
import {ApiProperty} from '@nestjs/swagger'




export class CreateLoginAttemptDto {
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
  required: false,
  nullable: true,
})
ipAddress?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
userAgent?: string  | null;
}
