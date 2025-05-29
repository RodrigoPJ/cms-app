import {
  validate,
  IsEmail,
  IsUUID,
  IsString,
  IsObject,
} from "class-validator";

export class Account {
  @IsUUID()
  id: string;

  @IsString()
  type: string;

  @IsString()
  projects: string;
}

export class NewAccountData {
  @IsObject()
  account: Account;

  @IsString()
  firstName: string;

  @IsEmail()
  user: string;
}

const validateNewUser = async (user: NewAccountData) => {
  const newAccount= new NewAccountData();
  newAccount.account = user.account;
  newAccount.firstName = user.firstName;
  newAccount.user = user.user;
  const validateUser = await validate(newAccount);
  return validateUser;
};

export default validateNewUser;
