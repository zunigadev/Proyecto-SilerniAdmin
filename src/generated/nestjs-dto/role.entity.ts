
import {ApiProperty} from '@nestjs/swagger'
import {UserRole} from './userRole.entity'
import {RolePermission} from './rolePermission.entity'


export class Role {
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
@ApiProperty({
  type: 'boolean',
})
enabled: boolean ;
@ApiProperty({
  isArray: true,
  required: false,
})
users?: UserRole[] ;
@ApiProperty({
  isArray: true,
  required: false,
})
permissions?: RolePermission[] ;
}
