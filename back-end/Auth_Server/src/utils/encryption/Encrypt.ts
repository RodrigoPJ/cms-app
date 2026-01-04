import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import {
  generateKeyPairSync,
  createPublicKey,
  createPrivateKey,
  privateDecrypt,
  constants,
  createDecipheriv
} from "crypto";
import dotenv from "dotenv";
import path from "path";
import { EncryptedPayload } from "../types";
import { log } from "console";

const env = process.env.NODE_ENV || "devlocal";
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

const { JWT_SECRET = "" } = process.env;
const rsaFilesPassphrase = process.env.RSA_PASSPHRASE;

export class Encrypt {
  static async encryptpass(password: string) {
    return bcrypt.hashSync(password, 12);
  }
  static comparepassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static async generateToken(payload: string) {
    const obj = {
      email: payload,
    };
    return jwt.sign(obj, JWT_SECRET, { expiresIn: "1h" });
  }

  static verifyToken(jwtoken: string) {
    const decode = jwt.verify(jwtoken, JWT_SECRET);
    return decode;
  }

  static generateRSAKeyPair() {
    const { publicKey, privateKey } = generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
        // === ENCRYPTION OPTIONS ===
        cipher: "aes-256-cbc", // The encryption algorithm
        passphrase: rsaFilesPassphrase, // The passphrase for encryption
      },
    });
    return {
      publicKey, privateKey
    }
  }

  static createPublicKeyObjectFromString(publicKeyString: string){
    const publicKeyObject = createPublicKey({
      key: publicKeyString,
      format: "pem",
      type: "spki",
    });
    return publicKeyObject;
  }

  static createPrivateKeyObjectFromString(privateKeyString: string){
    const privateKeyObject = createPrivateKey({
      key: privateKeyString,
      passphrase: rsaFilesPassphrase
    });
    return privateKeyObject;
  }

  static decryptAESKey(encryptedKeyBase64: string, privateKeyPem: string) {
  const encryptedKey = Buffer.from(encryptedKeyBase64, 'base64');

  return privateDecrypt(
    {
      key: privateKeyPem,
      padding: constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256'
    },
    encryptedKey
  );
}

static decryptData({ key, iv, data, tag }: EncryptedPayload, privateKeyPem: string) {
  const aesKey = this.decryptAESKey(key, privateKeyPem);
  const decipher = createDecipheriv(
    'aes-256-gcm',
    aesKey,
    Buffer.from(iv, 'base64')
  );
  decipher.setAuthTag(Buffer.from(tag, 'base64'));
  const decrypted =
    decipher.update(Buffer.from(data, 'base64')) +
    decipher.final('utf8');
  return JSON.parse(decrypted);
}

}
