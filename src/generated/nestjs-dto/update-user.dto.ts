
import {ApiProperty} from '@nestjs/swagger'




export class UpdateUserDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
name?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
p_surname?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
m_surname?: string ;
@ApiProperty({
  type: 'string',
  required: false,
})
status?: string ;
}
