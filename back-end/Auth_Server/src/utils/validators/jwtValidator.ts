import {  IsNumber, IsEmail, } from "class-validator";


export class JWebToken {
  @IsEmail()
  email: string;

  @IsNumber()
  exp: number;

  @IsNumber()
  iat: number;
}
