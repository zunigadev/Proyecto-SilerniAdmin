
import {ApiProperty} from '@nestjs/swagger'


export class UserPermissionDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
