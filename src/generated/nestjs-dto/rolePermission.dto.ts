
import {ApiProperty} from '@nestjs/swagger'


export class RolePermissionDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
