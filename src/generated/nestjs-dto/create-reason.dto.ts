
import {ApiProperty} from '@nestjs/swagger'




export class CreateReasonDto {
  @ApiProperty({
  type: 'string',
})
argument: string ;
}
