
import {ApiProperty} from '@nestjs/swagger'
import {Credential} from './credential.entity'
import {UserRole} from './userRole.entity'
import {UserPermission} from './userPermission.entity'
import {LoginAttempt} from './loginAttempt.entity'


export class User {
  @ApiProperty({
  type: 'integer',
  format: 'int32',
})
idUser: number ;
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
@ApiProperty({
  isArray: true,
  required: false,
})
roles?: UserRole[] ;
@ApiProperty({
  isArray: true,
  required: false,
})
permissions?: UserPermission[] ;
@ApiProperty({
  isArray: true,
  required: false,
})
loginAttempts?: LoginAttempt[] ;
}
