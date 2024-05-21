
import {ApiExtraModels,ApiProperty} from '@nestjs/swagger'

export class UserRoleUserIdRoleIdUniqueInputDto {
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
  }

@ApiExtraModels(UserRoleUserIdRoleIdUniqueInputDto)
export class ConnectUserRoleDto {
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
userId_roleId?: UserRoleUserIdRoleIdUniqueInputDto ;
}
