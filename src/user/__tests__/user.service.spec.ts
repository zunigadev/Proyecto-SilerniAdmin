import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { CredentialModule } from '../../credential/credential.module';
import { HashingModule } from '../../hashing/hashing.module';
import { UserController } from '../user.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, CredentialModule, HashingModule],
      providers: [UserService, PrismaService],
      controllers: [UserController]
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);

    // jest.spyOn(prismaService.user, 'findMany').mockResolvedValue([]);
  });

  // it('should return an array of users', async () => {
  //   const users: User[] = [
  //     { idUser: 1, name: 'John', p_surname: 'Doe', m_surname: 'Smith', status: 'accepted', credentialId: 1 },
  //     { idUser: 2, name: 'Jane', p_surname: 'Smith', m_surname: 'Doe', status: 'accepted', credentialId: 2 },
  //     // { idUser: 3, name: 'Alice', p_surname: 'Johnson', m_surname: 'Brown', status: 'accepted', credentialId: 3 },
  //     // { idUser: 4, name: 'Bob', p_surname: 'Williams', m_surname: 'Jones', status: 'accepted', credentialId: 4 },
  //     // { idUser: 5, name: 'Eva', p_surname: 'Anderson', m_surname: 'Taylor', status: 'accepted', credentialId: 5 },
  //     // { idUser: 6, name: 'Michael', p_surname: 'Garcia', m_surname: 'Martinez', status: 'accepted', credentialId: 6 },
  //     // { idUser: 7, name: 'Sophia', p_surname: 'Hernandez', m_surname: 'Lopez', status: 'accepted', credentialId: 7 },
  //     // { idUser: 8, name: 'William', p_surname: 'Harris', m_surname: 'Clark', status: 'accepted', credentialId: 8 },
  //   ];


  //   jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(users);
  //   const result = await service.findAll();
  //   expect(result).toEqual(users);
  // });

  it('should return user by code', async () => {
    // Arrange
    const code = '123456';
    
    const user: User = {
      idUser: 1,
      name: 'John',
      p_surname: 'Doe',
      m_surname: 'Smith',
      status: 'accepted',
      credentialId: 1,
      credential: {
        idCredential: 1,
        code: '123456',
        email: 'john@example.com',
        emailVerified: true,
        password: 'hashedPassword',
        repPassword: 'hashedPassword',
        tokenId: 'tokenId'
      }
    };

    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(user);

    // Act
    const result = await service.findByCode(code);

    // Assert
    expect(result).toEqual(user);
  });

  it('should return null if user not found by code', async () => {
    // Arrange
    const code = '123456';

    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);

    // Act
    const result = await service.findByCode(code);

    // Assert
    expect(result).toBeNull();
  });

});
