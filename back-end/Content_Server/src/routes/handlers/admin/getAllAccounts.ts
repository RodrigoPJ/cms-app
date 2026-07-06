import { Request, Response } from "express";
import { log } from "console";
import { AppDataSource } from "../../../database/db-config/data-source";
import { Account } from "../../../database/db-config/entity/Account";

const getAllUsers = async(req:Request, res:Response) => {
  log(req.headers["user-agent"]);
  const allUsers = await AppDataSource.getRepository(Account).find();
  res.status(200).json(allUsers);
}

export default getAllUsers;