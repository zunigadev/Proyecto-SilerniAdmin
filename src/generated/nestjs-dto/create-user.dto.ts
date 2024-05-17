
import {ApiProperty} from '@nestjs/swagger'




export class CreateUserDto {
  @ApiProperty({
  type: 'string',
})
name: string ;
@ApiProperty({
  type: 'string',
})
p_surname: string ;
@ApiProperty({
  type: 'string',
})
m_surname: string ;
@ApiProperty({
  type: 'string',
})
status: string ;
}
