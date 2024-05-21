
import {ApiProperty} from '@nestjs/swagger'




export class UpdateRoleDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
name?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
description?: string ;
}
