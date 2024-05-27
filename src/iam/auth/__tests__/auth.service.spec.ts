// import { MailerService } from 'src/mailer'; // Asegúrate de ajustar la ruta según tu estructura de proyecto
// import { UserRepository } from './user.repository'; // Dependencias necesarias
// import { TokenIdsStorage } from './token-ids.storage'; // Dependencias necesarias
// import { randomUUID } from 'crypto';

// jest.mock('./user.repository');
// jest.mock('./token-ids.storage');
// jest.mock('crypto', () => ({
//   randomUUID: jest.fn(),
// }));

// describe('MailerService', () => {
//   let mailerService: MailerService;
//   let userRepository: jest.Mocked<UserRepository>;
//   let tokenIdsStorage: jest.Mocked<TokenIdsStorage>;

//   beforeEach(() => {
//     userRepository = new UserRepository() as jest.Mocked<UserRepository>;
//     tokenIdsStorage = new TokenIdsStorage() as jest.Mocked<TokenIdsStorage>;
//     mailerService = new MailerService(userRepository, tokenIdsStorage, {
//       passwordResetTokenTtl: 3600, // 1 hora de tiempo de vida
//     });
//   });

//   it('should generate a token for password validation if user exists', async () => {
//     const user = { idUser: 'user123', credential: { email: 'test@example.com', code: 'somecode' } };
//     userRepository.findUserByEmail.mockResolvedValue(user);
//     (randomUUID as jest.Mock).mockReturnValue('uuid123');
//     tokenIdsStorage.insert.mockResolvedValue();

//     const token = await mailerService.generateTokenToValidatePassword('test@example.com');

//     expect(userRepository.findUserByEmail).toHaveBeenCalledWith('test@example.com');
//     expect(randomUUID).toHaveBeenCalled();
//     expect(mailerService.signToken).toHaveBeenCalledWith(user.idUser, 3600, { passwordTokenId: 'uuid123' });
//     expect(tokenIdsStorage.insert).toHaveBeenCalledWith(user.idUser, 'uuid123', TokenType.PASSWORD_RESET, undefined);
//     expect(token).toBeDefined();
//   });

//   it('should throw an error if user does not exist', async () => {
//     userRepository.findUserByEmail.mockResolvedValue(null);

//     await expect(mailerService.generateTokenToValidatePassword('nonexistent@example.com')).rejects.toThrow('User not found');

//     expect(userRepository.findUserByEmail).toHaveBeenCalledWith('nonexistent@example.com');
//     expect(randomUUID).not.toHaveBeenCalled();
//     expect(mailerService.signToken).not.toHaveBeenCalled();
//     expect(tokenIdsStorage.insert).not.toHaveBeenCalled();
//   });
// });
