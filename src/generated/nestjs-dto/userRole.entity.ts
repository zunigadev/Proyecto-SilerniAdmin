
import {ApiProperty} from '@nestjs/swagger'
import {User} from './user.entity'
import {Role} from './role.entity'


export class UserRole {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
userId: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
roleId: number ;
@ApiProperty({
  required: false,
})
user?: User ;
@ApiProperty({
  required: false,
})
role?: Role ;
}
