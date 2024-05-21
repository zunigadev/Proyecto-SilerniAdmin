
import {ApiProperty} from '@nestjs/swagger'




export class UpdateMenuDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
name?: string ;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
icon?: string  | null;
@ApiProperty({
  type: 'string',
  required: false,
  nullable: true,
})
link?: string  | null;
}
