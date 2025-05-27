import { Request, Response } from "express";
import { AppDataSource } from "../db-config/data-source";
import { log } from "console";
import { User } from "../db-config/entity/UserAuth";


const getAllUsers = async (req: Request, res: Response)=>{
  const repository = AppDataSource.getRepository(User);
  const allUsers = await repository.find({})
  log(req.headers["user-agent"])
  res.status(200).json(allUsers);
}

export default getAllUsers;