// import { Test, TestingModule } from '@nestjs/testing';
// import { UserService } from '../user.service';
// import { PrismaModule } from '../../prisma/prisma.module';
// import { CredentialModule } from '../../credential/credential.module';
// import { HashingModule } from '../../hashing/hashing.module';
// import { UserController } from '../user.controller';
// import { PrismaService } from '../../prisma/prisma.service';
// import { User } from '@prisma/client';
// import { NotFoundException } from '@nestjs/common';




// describe('UserService', () => {
//   let service: UserService;
//   let prismaService: PrismaService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [PrismaModule, CredentialModule, HashingModule],
//       providers: [UserService, PrismaService],
//       controllers: [UserController]
//     }).compile();

//     service = module.get<UserService>(UserService);
//     prismaService = module.get<PrismaService>(PrismaService);

//   });

//   it('should return an array of users', async () => {
//     const users: User[] = [
//       { idUser: 1, name: 'John', p_surname: 'Doe', m_surname: 'Smith', status: 'accepted', credentialId: 1 },
//       { idUser: 2, name: 'test', p_surname: 'test', m_surname: 'Rosas', status: 'accepted', credentialId: 12 },
//       // { idUser: 3, name: 'Robert', p_surname: 'Flores', m_surname: 'Parco', status: 'accepted', credentialId: 41 }
//     ];


//     jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(users);

//     const result = await service.findAll();

//     expect(result).toEqual(users);
//   });



//   it('should return user by code', async () => {
//     // Arrange
//     const code = '123456';
    
//     const user: User = {
//       idUser: 1,
//       name: 'John',
//       p_surname: 'Doe',
//       m_surname: 'Smith',
//       status: 'accepted',
//       credentialId: 1,
//       // credential: {
//       //   idCredential: 1,
//       //   code: '123456',
//       //   email: 'john@example.com',
//       //   emailVerified: true,
//       //   password: 'hashedPassword',
//       //   repPassword: 'hashedPassword',
//       //   tokenId: 'tokenId'
//       // }
//     };

//     jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(user);

//     // Act
//     const result = await service.findByCode(code);

//     // Assert
//     expect(result).toEqual(user);
//   });

//   it('should return null if user not found by code', async () => {
//     // Arrange
//     const code = '123456';

//     jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);

//     // Act
//     const result = await service.findByCode(code);

//     // Assert
//     expect(result).toBeNull();
//   });

//   it('should change the password if credential exists', async () => {
//     // Arrange
//     const credentialId = 123;
//     const newPassword = 'newPassword123';

//     // Mock de la operación de actualización de la credencial
//     const updateMock = jest.fn();

//     // Simulamos que la credencial existe en la base de datos
//     jest.spyOn(prismaService.credential, 'findUnique').mockResolvedValue({ 
//       idCredential: credentialId,
//       code: '', // Agrega las propiedades restantes con valores vacíos o adecuados
//       email: '',
//       emailVerified: false,
//       password: '',
//       repPassword: '',
//       refreshTokenId: '',
//       emailTokenId: '',
//       resetPassTokenId: '',
//     });
    
//     jest.spyOn(prismaService.credential, 'update').mockImplementation(updateMock);

//     // Act
//     await service.changePassword(credentialId, newPassword);

//     // Assert
//     expect(updateMock).toHaveBeenCalledWith({ data: { password: expect.any(String) }, where: { idCredential: credentialId } });
// });


//   it('should throw NotFoundException if credential does not exist', async () => {
//     // Arrange
//     const credentialId = 123;
//     const newPassword = 'newPassword123';

//     // Simulamos que la credencial no existe en la base de datos
//     jest.spyOn(prismaService.credential, 'findUnique').mockResolvedValue(null);

//     // Act y Assert
//     await expect(service.changePassword(credentialId, newPassword)).rejects.toThrowError(NotFoundException);
//   });


// });
