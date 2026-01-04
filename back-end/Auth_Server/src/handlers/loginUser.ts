import { Request, Response } from "express";
import { AppDataSource } from "../server";
import { User } from "../db-config/entity/user";
import { Encrypt } from "../utils/encryption/Encrypt";
import { join, resolve, dirname } from "node:path";
import { log } from "console";
import { readFile, stat } from "node:fs/promises";

const loginUser = async (req: Request, res: Response) => {
  const privateKeyPath = join(process.cwd(), "keys/id_rsa_enc.pem");
  const privateKeyFile = await readFile(privateKeyPath, 'utf-8');
  const privateKeyObj = Encrypt.createPrivateKeyObjectFromString(privateKeyFile);
  const privateKey = privateKeyObj.export({
    type: "pkcs8",
    format: "pem",
  }) as string;
  
  log("login");
  const { key, iv, data, tag } = req.body;
  const decryptedData = Encrypt.decryptData({key, iv, data, tag}, privateKey);
  log(decryptedData);
  const { email, password } = decryptedData;

  const user = await AppDataSource.getRepository(User).find({
    where: {
      email,
    },
  });
  log(user)
  if (user.length > 1) {
    res.status(401).send("user duplicated");
  } else if (user.length === 1) {
    const comparepassword = Encrypt.comparepassword(user[0].password, password);
    if (comparepassword) {
      const token = await Encrypt.generateToken(user[0].email);
      const newUser = {
        account: user[0].account,
        firstName: user[0].firstName,
        user: user[0].email,
      };
      res
        .cookie("token_bearer", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 24 * 3600 * 1000, // one day
        })
        .status(200)
        .json(newUser);
    } else {
      res.status(401).send("wrong password");
    }
  } else if (user.length === 0) {
    res.status(404).send("user not found");
  }
};

export default loginUser;
