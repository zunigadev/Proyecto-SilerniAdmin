
import {ApiProperty} from '@nestjs/swagger'


export class PermissionDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'boolean',
})
effect: boolean ;
@ApiProperty({
  type: 'string',
})
name: string ;
@ApiProperty({
  type: 'string',
})
resource: string ;
@ApiProperty({
  type: 'string',
})
action: string ;
}
