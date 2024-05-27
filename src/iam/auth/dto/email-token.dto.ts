import { IsNotEmpty } from "class-validator";

export class EmailTokenDto {
  @IsNotEmpty()
  emailToken: string;
}
