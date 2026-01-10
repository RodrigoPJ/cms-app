import { Request, Response } from "express";
import { join } from "node:path";
import { error, log } from "console";
import {
  readActiveKey,
  createAndActivateKey,
  readActiveKeyId,
  keyIsOlderThanADay
} from "../utils/helper/keysHelper";

const KEYS_DIR = join(process.cwd(), "keys");

const keys = async (req: Request, res: Response) => {
  log("Keys");
  log(req.headers["user-agent"]);
  let activeKey;
  try {
    const activeKid = await readActiveKeyId();
    if (activeKid) {
      const activeKeyDir = join(KEYS_DIR, activeKid, 'id_rsa_enc.pem');
      const keyIsOld = await keyIsOlderThanADay(activeKeyDir);
      if (keyIsOld) {
        activeKey = await createAndActivateKey();
        res.status(200).json(activeKey);
        return;
      } else {
        activeKey = await readActiveKey();
        res.status(200).json(activeKey);
        return;
      } 
    } else {
      activeKey = await createAndActivateKey();
      res.status(200).json(activeKey);
    }
  } catch (err) {
    error(err);
    res.status(500).json({ error: "Key management failure" });
  }
};

export default keys;
