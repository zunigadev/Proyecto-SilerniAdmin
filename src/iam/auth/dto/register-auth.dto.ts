export class RegisterUserDto {
  readonly name: string;
  readonly p_surname: string;
  readonly m_surname: string;
  status: string;
  credential: {
    email?: string;
    code?: string;
    password?: string;
    repPassword?: string;
  };
  userAgent?: string = null;
}
