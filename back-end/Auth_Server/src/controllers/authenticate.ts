import { Request, Response } from "express";
import { log } from "console";
import { Encrypt } from "../utils/encryption/Encrypt";
import { AppDataSource } from "../db-config/data-source";
import { User } from "../db-config/entity/UserAuth";

const authenticate = async (req: Request, res: Response) => {
  const token = req.cookies;
  log(req.headers["user-agent"]);
  if (token) {
    const jwtoken = token["token_bearer"];
    if (jwtoken) {
      const payload = Encrypt.verifyToken(jwtoken);
      if ((typeof payload !== 'string')) {
        const tokenMail = payload['email'] as string;
        const timeEmitted = payload.exp;
        const now = Date.now();
        if (timeEmitted){
          const isExpired = timeEmitted - now > 0;
          if(isExpired) {
            res.status(401).send('timed out, login again');
          }
        }
        const manager = AppDataSource.manager;
        const user = await manager.findOne(User, {
          where: { email: tokenMail },
        });
        if(user) {
          res.status(200).json({ auth: true, payload, user: user.email });
        }
      }else {
        res.status(401).send('no token');
      }
    }else {
        res.status(401).send('no token');
      }
  }else {
    res.status(401).send('not authorised');
  }
  
};

export default authenticate;
