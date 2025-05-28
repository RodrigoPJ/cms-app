import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET = "" } = process.env;

export class Encrypt {
  static async encryptpass(password: string) {
    return bcrypt.hashSync(password, 12);
  }
  static comparepassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static async generateToken(payload: string) {
    const obj ={
      email: payload
    }
    return jwt.sign(obj, JWT_SECRET, {expiresIn: '1h'});
  }

  static verifyToken(jwtoken: string) {
    const decode = jwt.verify(jwtoken, JWT_SECRET);
    return decode;
  }
}