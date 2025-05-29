import { Request, Response } from "express";
import { AppDataSource } from "../db-config/data-source";
import { log } from "console";
import { User } from "../db-config/entity/UserAuth";
import { TypeORMError } from "typeorm";

const getAllUsers = async (req: Request, res: Response) => {
  const repository = AppDataSource.getRepository(User);
  try {
    const allUsers = await repository.query('SELECT * FROM public."user"');
    log(req.headers["user-agent"]);
    res.status(200).json(allUsers);
  } catch (error) {
    const typedError = error as any;
    if (typedError["name"] === "TypeORMError") {
      log((error as TypeORMError).stack);
      res.status(503).json((error as TypeORMError).message);
    } else {
      res.status(503).send("unknown error");
    }
  }
};

export default getAllUsers;
