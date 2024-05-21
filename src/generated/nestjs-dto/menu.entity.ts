
import {ApiProperty} from '@nestjs/swagger'
import {Permission} from './permission.entity'


export class Menu {
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
  nullable: true,
})
icon: string  | null;
@ApiProperty({
  type: 'string',
  nullable: true,
})
link: string  | null;
@ApiProperty({
  type: 'integer',
  format: 'int32',
  nullable: true,
})
parentId: number  | null;
@ApiProperty({
  required: false,
  nullable: true,
})
parent?: Menu  | null;
@ApiProperty({
  isArray: true,
  required: false,
})
submenus?: Menu[] ;
@ApiProperty({
  isArray: true,
  required: false,
})
permissions?: Permission[] ;
}
