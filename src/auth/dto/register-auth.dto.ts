import { PartialType } from "@nestjs/swagger";
import { LoginAuthDto } from "./login-auth.dto";

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
    name: string;
    p_surname: string;
    m_surname: string;
    status: string;
}