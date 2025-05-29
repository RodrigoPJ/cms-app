import { Request, Response } from "express";
import { log } from "console";
import { AppDataSource } from "../../database/db-config/data-source";
import { TypeORMError } from "typeorm";
import { UserContent } from "../../database/db-config/entity/UserContent";

const getUser = async (req: Request, res: Response) => {
  log(req.headers["user-agent"]);
  const { account } = req.body;
  try {
    if (typeof account === "string") {
      const userAccount = await AppDataSource.getRepository(
        UserContent
      ).findOne({
        where: {
          id: account,
        },
      });
      if (userAccount) {
        log(userAccount.id);
        res.status(200).json(userAccount);
      } else {
        res.status(400).json({ message: "Account not found in db" });
      }
    } else {
      res.status(404).send("no account in request");
    }
  } catch (error) {
    const typedError = error as any;
    if (typedError["name"] === "TypeORMError") {
      log((error as TypeORMError).stack);
      res.status(400).json((error as TypeORMError).message);
    } else {
      res.status(404).send("not found");
    }
  }
};

export default getUser;
