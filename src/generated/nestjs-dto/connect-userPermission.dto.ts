
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'

export class UserPermissionUserIdPermissionIdUniqueInputDto {
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
  }

@ApiExtraModels(UserPermissionUserIdPermissionIdUniqueInputDto)
export class ConnectUserPermissionDto {
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
userId_permissionId?: UserPermissionUserIdPermissionIdUniqueInputDto ;
}
