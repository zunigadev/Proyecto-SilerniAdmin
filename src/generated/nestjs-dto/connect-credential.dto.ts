
import {ApiProperty} from '@nestjs/swagger'




export class ConnectCredentialDto {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
idCredential: number ;
}
