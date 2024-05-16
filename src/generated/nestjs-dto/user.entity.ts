
import {ApiProperty} from '@nestjs/swagger'
import {Credential} from './credential.entity'


export class User {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
idUser: number ;
@ApiProperty({
  type: 'string',
})
email: string ;
@ApiProperty({
  type: 'string',
})
name: string ;
@ApiProperty({
  type: 'string',
})
p_surname: string ;
@ApiProperty({
  type: 'string',
})
m_surname: string ;
@ApiProperty({
  type: 'string',
})
status: string ;
@ApiProperty({
  required: false,
})
credential?: Credential ;
@ApiProperty({
  type: 'integer',
  format: 'int32',
})
credentialId: number ;
}
