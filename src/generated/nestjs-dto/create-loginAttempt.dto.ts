
import {ApiProperty} from '@nestjs/swagger'




export class CreateLoginAttemptDto {
  @ApiProperty({
  type: 'string',
})
username: string ;
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
