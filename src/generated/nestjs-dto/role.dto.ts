
import {ApiProperty} from '@nestjs/swagger'


export class RoleDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'string',
})
name: string ;
@ApiProperty({
  type: 'string',
})
description: string ;
}
