import { Request, Response } from "express";
import { log } from "console";
import { AppDataSource } from "../../../database/db-config/data-source";
import { Content } from "../../../database/db-config/entity/Content";

const getAllContents = async (req: Request, res: Response) => {
  log(req.headers["user-agent"], "admin get all contents");
  try {
    const allContents = await AppDataSource.getRepository(Content).find();
    res.status(200).json(allContents);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
};

export default getAllContents;
