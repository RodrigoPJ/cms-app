import { NextFunction, Request, Response } from "express";
import { log } from "console";
import { Encrypt } from "../utils/encryption/Encrypt";
import { AppDataSource } from "../db-config/data-source";
import { User } from "../db-config/entity/user";
import { JWebToken } from "../utils/validators/jwtValidator";
import { validate } from "class-validator";

const authenticate = async (req: Request, res: Response, next:NextFunction) => {
  const cookies = req.cookies;
  log(req.headers["user-agent"]);
  console.log('authenticating thru cookies');
  if (typeof cookies === "object") {
    const jwtoken: string | undefined = cookies["token_bearer"];
    if (jwtoken) {
      try {
        const payload = Encrypt.verifyToken(jwtoken);
        if (typeof payload === "object") {
          const newJWT = new JWebToken();
          newJWT.email = payload.email;
          if (payload.exp) newJWT.exp = payload.exp;
          if (payload.iat) newJWT.iat = payload.iat;
          const validateJWTErrors = await validate(newJWT);
          if (validateJWTErrors.length > 0)
            res
              .clearCookie("token_bearer")
              .status(401)
              .json({ ...validateJWTErrors.map((el) => el.constraints) });
          const tokenMail = newJWT.email;
          const timeExpiration = newJWT.exp;
          log(newJWT)
          const now = Date.now();
          if (timeExpiration && tokenMail) {
            const isExpired = timeExpiration - now > 0;
            if (isExpired) {
              res
                .clearCookie("token_bearer")
                .status(401)
                .send("timed out, login again");
            } else {
              const manager = AppDataSource.manager;
              const user = await manager.findOne(User, {
                where: { email: tokenMail },
              });
              if (user) {
                const newToken = await Encrypt.generateToken(tokenMail);
                res.cookie('bearer_token', newToken);
                next();
              } else {
                res
                  .clearCookie("token_bearer")
                  .status(401)
                  .send("no existing user");
              }
            }
          } else {
            res.clearCookie("token_bearer").status(401).send("bad token");
          }
        } else {
          res.status(401).send("no token");
        }
      } catch (error) {
        res.status(403).json(error);
      }
    } else {
      res.status(401).send("no token");
    }
  } else {
    res.status(401).send("not authorised");
  }
};

export default authenticate;
