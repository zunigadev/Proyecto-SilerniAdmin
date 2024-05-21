
import {ApiProperty} from '@nestjs/swagger'




export class CreateMenuDto {
  @ApiProperty({
  type: 'string',
})
name: string ;
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
