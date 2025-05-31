import {
  validate,
  IsInt,
  Length,
  IsOptional,
  IsEmail,
  IsDate,
  Min,
  Max,
  IsStrongPassword,
} from "class-validator";

export class UserClass {
  @Length(1, 24)
  firstName: string;

  @Length(1, 24)
  lastName: string;

  @IsInt()
  @Min(0)
  @Max(122)
  age: number;

  @IsEmail()
  email: string;

  @Length(5, 178)
  @IsStrongPassword()
  password: string;

  @IsDate()
  @IsOptional()
  createDate: Date;

  @IsInt()
  @IsOptional()
  id: number;
}

const validateUser = async (user: UserClass) => {
  const newUser = new UserClass();
  newUser.age = user.age;
  newUser.email = user.email;
  newUser.firstName = user.firstName;
  newUser.lastName = user.lastName;
  newUser.createDate = user.createDate;
  newUser.password = user.password;
  const validateUser = await validate(newUser);
  return validateUser;
};

export default validateUser;
