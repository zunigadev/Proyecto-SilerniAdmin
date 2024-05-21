
import {ApiProperty} from '@nestjs/swagger'




export class CreatePermissionDto {
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
