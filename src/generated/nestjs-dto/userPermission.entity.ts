
import {ApiProperty} from '@nestjs/swagger'
import {User} from './user.entity'
import {Permission} from './permission.entity'


export class UserPermission {
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
permissionId: number ;
@ApiProperty({
  required: false,
})
user?: User ;
@ApiProperty({
  required: false,
})
permission?: Permission ;
}
