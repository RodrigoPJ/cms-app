import { Request, Response } from "express";
import { log } from "console";
import { AppDataSource } from "../../database/db-config/data-source";
import { TypeORMError } from "typeorm";
import { User } from "../../database/db-config/entity/User";
import { ProjectItem } from "../../database/db-config/entity/ProjectItem";

const getUser = async (req: Request, res: Response) => {
  log(req.headers["user-agent"]);
  log(req.query);
  const { accountId } = req.query;
  try {
    if (typeof accountId === "string") {
      const userAccount = await AppDataSource.getRepository(
        User
      ).findOne({
        where: {
          id: accountId,
        },
        // relations: {
        //   projectList: true
        // }
      });
      log(userAccount)
      const projects = await AppDataSource.getRepository(ProjectItem).find({
        where: {
          accountId: accountId
        }
      })
      console.log(projects);
      
      if (userAccount) {
        res.status(200).json({userAccount,projects});
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
      log(error)
      res.status(404).send(error);
    }
  }
};

export default getUser;
