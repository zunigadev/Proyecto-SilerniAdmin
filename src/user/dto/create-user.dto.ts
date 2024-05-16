// import { IsString } from "class-validator";

export class CreateUserDto {
    
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