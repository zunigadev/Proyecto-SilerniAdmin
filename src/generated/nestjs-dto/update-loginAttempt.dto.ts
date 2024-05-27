
import {ApiProperty} from '@nestjs/swagger'




export class UpdateLoginAttemptDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
username?: string ;
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
