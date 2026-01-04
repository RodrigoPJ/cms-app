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

export interface ContentNewUserResponse {
  dateCreated: string;
	user: string;
	userName: string;
	userType: string;
	id: string;
}

export interface DataBaseParams {
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
}

export interface EncryptedPayload {
  data: string;
  iv: string;
  key: string;
  tag: string;
}