import { Request, Response } from "express";
import { writeFile, readFile, mkdir, stat } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import dotenv from "dotenv";
import { log } from "console";
import { Encrypt } from "../utils/encryption/Encrypt";

const env = process.env.NODE_ENV || "devlocal";
dotenv.config({ path: resolve(process.cwd(), `.env.${env}`) });

const keys = async (req: Request, res: Response) => {
  log("Keys endpoint");
  log(req.headers["user-agent"]);
  const privateKeyPath = join(process.cwd(), "keys/id_rsa_enc.pem");
  const publicKeyPath = join(process.cwd(), "keys/id_rsa_pub.pem");
  let publicKeyFile: string;
  let privateKeyFile;

  try {
    publicKeyFile = await readFile(publicKeyPath, 'utf-8');
    privateKeyFile = await readFile(privateKeyPath, 'utf-8');
    const fileStats = await stat(publicKeyPath);
    const creationDate = new Date(fileStats.birthtime);
    const ageOfKeyInHours = (Date.now() - creationDate.valueOf())/(1000 * 3600);
    log(ageOfKeyInHours);
    res.status(200).json({ publicKey: publicKeyFile });
  } catch (error) {
    if (error instanceof Error) {
      log(error.message);
      if (error.message.includes("no such file or directory")) {
        const { publicKey, privateKey } = Encrypt.generateRSAKeyPair();
        const dir = dirname(privateKeyPath);
        await  mkdir(dir, { recursive: true });
        await writeFile(publicKeyPath, publicKey, 'utf-8');
        await writeFile(privateKeyPath, privateKey, 'utf-8');
        res.json({ publicKey: publicKey });
      }
    }
  }
};

export default keys;
