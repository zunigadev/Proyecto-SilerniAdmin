
import { ApiProperty } from '@nestjs/swagger'




export class CreateRoleDto {
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'string',
  })
  description: string;

  permissionsIds: number[]
}
