
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'

export class RolePermissionRoleIdPermissionIdUniqueInputDto {
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
  }

@ApiExtraModels(RolePermissionRoleIdPermissionIdUniqueInputDto)
export class ConnectRolePermissionDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
  required: false,
  nullable: true,
})
id?: number ;
@ApiProperty({
  required: false,
  nullable: true,
})
roleId_permissionId?: RolePermissionRoleIdPermissionIdUniqueInputDto ;
}
