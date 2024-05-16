
export class RegisterUserDto {
    readonly email: string;
    readonly name: string;
    readonly p_surname: string;
    readonly m_surname: string;
    status: string;
    credential: {
        password: string;
        repPassword: string;
    }
}