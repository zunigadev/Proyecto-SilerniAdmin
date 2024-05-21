
import {ApiProperty} from '@nestjs/swagger'


export class UserRoleDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
id: number ;
}
