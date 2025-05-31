import { Request, Response } from "express";
import { log } from "console";
import { AppDataSource } from "../../../database/db-config/data-source";
import { User } from "../../../database/db-config/entity/User";

const getAllContents = async (req: Request, res: Response) => {
  log(req.headers["user-agent"], "admin get all contents");
  try {
    const allUsers = await AppDataSource.getRepository(User).query(
      'SELECT * FROM public."project_content"'
    );
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
};

export default getAllContents;
