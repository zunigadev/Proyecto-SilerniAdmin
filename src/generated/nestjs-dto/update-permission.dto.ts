
import {ApiProperty} from '@nestjs/swagger'




export class UpdatePermissionDto {
  @ApiProperty({
  type: 'boolean',
  required: false,
})
effect?: boolean ;
@ApiProperty({
  type: 'string',
  required: false,
})
name?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
resource?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
action?: string ;
}
