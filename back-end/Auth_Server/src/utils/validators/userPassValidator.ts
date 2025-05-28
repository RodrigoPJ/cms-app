import { IsEmail, IsString, validate, } from "class-validator";


export class UserPass {
  @IsEmail()
  email: string;

  @IsString()
  password: number;

}

export default async function validateUserPass (pair: UserPass) {
  const {email, password } = pair;
  const Pair = new UserPass();
  Pair.email = email;
  Pair.password = password;
  const validated = await validate(Pair);
  return validated;
}
