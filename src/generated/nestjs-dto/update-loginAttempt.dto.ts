
import {ApiProperty} from '@nestjs/swagger'




export class UpdateLoginAttemptDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
location?: string ;
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
  type: 'boolean',
  required: false,
})
success?: boolean ;
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
