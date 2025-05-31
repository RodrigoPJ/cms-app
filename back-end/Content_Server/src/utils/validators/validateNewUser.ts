import { validate, IsEmail, IsUUID, IsString, IsObject } from "class-validator";

export class RequestUser {
  @IsString()
  firstName: string;
  @IsEmail()
  user: string;
}

const validateNewUser = async (user: RequestUser) => {
  const newUser = new RequestUser();
  newUser.firstName = user.firstName;
  newUser.user = user.user;
  const validateUser = await validate(newUser);
  return validateUser;
};

export default validateNewUser;
