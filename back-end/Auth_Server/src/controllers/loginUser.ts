import { Request, Response } from "express";
import { AppDataSource } from "../db-config/data-source";
import { log } from "console";
import { User } from "../db-config/entity/UserAuth";
import { Encrypt } from "../utils/encryption/Encrypt";
import * as dotenv from 'dotenv';

const loginUser = async (req: Request, res: Response) => {
  log(req.headers["user-agent"]);
  const hasjsonheaders = req.headers["content-type"];
  if (hasjsonheaders?.includes("json") && req.body) {
    if (
      typeof req.body?.email === "string" &&
      typeof req.body?.email === "string"
    ) {
      const { email, password } = req.body;
      const manager = AppDataSource.manager;
      const user = await manager.find(User, {
        where: {
          email: email,
        },
      });
      if (user.length > 1) {
        res.status(401).send("duplicate user");
      } else if (user.length === 1) {
        const comparepassword = Encrypt.comparepassword(user[0].password, password)
        if (comparepassword) {
          const token = await Encrypt.generateToken(user[0].email)
          res.cookie('token_bearer', token).status(200).json({loggedIn: true});
        }else {
          res.status(401).send('wrong password')
        }
      } else if (user.length === 0) {
        res.status(404).send('user not found')
      }
    } else {
      res.status(401).send("incorrect credentials");
    }
  } else {
    res.status(400).send("no json content");
  }
};

export default loginUser;
