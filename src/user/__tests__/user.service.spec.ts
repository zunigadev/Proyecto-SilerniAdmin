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

  });

  it('should return an array of users', async () => {
    const users: User[] = [
      { idUser: 1, name: 'John', p_surname: 'Doe', m_surname: 'Smith', status: 'accepted', credentialId: 1 },
      { idUser: 2, name: 'test', p_surname: 'test', m_surname: 'Rosas', status: 'accepted', credentialId: 12 },
      // { idUser: 3, name: 'Robert', p_surname: 'Flores', m_surname: 'Parco', status: 'accepted', credentialId: 41 }
    ];


    jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(users);

    const result = await service.findAll();

    expect(result).toEqual(users);
  });



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
      // credential: {
      //   idCredential: 1,
      //   code: '123456',
      //   email: 'john@example.com',
      //   emailVerified: true,
      //   password: 'hashedPassword',
      //   repPassword: 'hashedPassword',
      //   tokenId: 'tokenId'
      // }
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
