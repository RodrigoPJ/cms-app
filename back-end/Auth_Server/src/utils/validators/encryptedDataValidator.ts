import { IsEmail, IsString, validate, } from "class-validator";


export class EncryptedData {
  @IsString()
  data: string;

  @IsString()
  iv: string;

  @IsString()
  key: string;

  @IsString()
  tag: string;

}

export default async function validateEncryptedData (encrypted: EncryptedData) {
  const {data, iv, key, tag } = encrypted;
  const Encrypted = new EncryptedData();
  Encrypted.data = data;
  Encrypted.key = key;
  Encrypted.iv = iv;
  Encrypted.tag = tag;
  const validated = await validate(Encrypted);
  return validated;
}
