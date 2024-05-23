
import {ApiProperty} from '@nestjs/swagger'




export class UpdateReasonDto {
  @ApiProperty({
  type: 'string',
  required: false,
})
argument?: string ;
}
