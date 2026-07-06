import { validate, IsEmail, IsString, } from "class-validator";

export class AccountRequest {
  @IsString()
  name!: string;
  @IsEmail()
  userName!: string;
}

const validateNewUser = async (user: AccountRequest) => {
  const newUser = new AccountRequest();
  newUser.name = user.name;
  newUser.userName = user.userName;
  const validateUser = await validate(newUser);
  return validateUser;
};

export default validateNewUser;
