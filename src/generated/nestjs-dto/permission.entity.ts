
import {ApiProperty} from '@nestjs/swagger'
import {Menu} from './menu.entity'
import {RolePermission} from './rolePermission.entity'
import {UserPermission} from './userPermission.entity'


export class Permission {
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
@ApiProperty({
  isArray: true,
  required: false,
})
menus?: Menu[] ;
@ApiProperty({
  isArray: true,
  required: false,
})
roles?: RolePermission[] ;
@ApiProperty({
  isArray: true,
  required: false,
})
users?: UserPermission[] ;
}
