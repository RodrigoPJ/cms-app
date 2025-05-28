import { JwtPayload } from "jsonwebtoken";

export interface UserCreds{
  user: string;
  password: string;
}

export interface JWTPayload extends JwtPayload{
  email?: string;
  iat: number;
  exp: number;
}