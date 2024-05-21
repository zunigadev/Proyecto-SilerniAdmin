
import {ApiProperty} from '@nestjs/swagger'
import {Role} from './role.entity'
import {Permission} from './permission.entity'


export class RolePermission {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
roleId: number ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
permissionId: number ;
@ApiProperty({
  required: false,
})
role?: Role ;
@ApiProperty({
  required: false,
})
permission?: Permission ;
}
