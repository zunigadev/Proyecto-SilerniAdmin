// import { IsString } from "class-validator";

export class CreateUserDto {
    readonly name: string;
    readonly p_surname: string;
    readonly m_surname: string;
    status: string;
    credential: {
        email?: string;
        code?: string;
        password?: string;
        repPassword?: string;
    }
}