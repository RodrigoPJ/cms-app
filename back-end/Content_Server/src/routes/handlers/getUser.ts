import { Request, Response } from "express";
import { log } from "console";
import { AppDataSource } from "../../database/db-config/data-source";
import { TypeORMError } from "typeorm";
import { User } from "../../database/db-config/entity/User";
import { ProjectItem } from "../../database/db-config/entity/ProjectItem";
import { ProjectContent } from "../../database/db-config/entity/ProjectContent";

const getUser = async (req: Request, res: Response) => {
  log(req.headers["user-agent"]);
  const { account } = req.body;
  try {
    if (typeof account === "string") {
      const userAccount = await AppDataSource.getRepository(
        User
      ).findOne({
        where: {
          id: account,
        },
        relations: {
          projectListId:true
        }
      });
      if (userAccount) {
        if(userAccount.projectListId.id) {
          const listOfProjects = await  AppDataSource.getRepository(ProjectContent).find({
            where:{
              id: userAccount.projectListId.id
            }
          });
          log(userAccount.projectListId);
        const complementedUser = {
          ...userAccount,
          listOfProjects
        }
        res.status(200).json(complementedUser);
        } else {
          res.status(400).json();
        }
        
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
