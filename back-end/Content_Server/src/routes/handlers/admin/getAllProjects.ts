import { Request, Response } from "express";
import { log } from "console";
import { AppDataSource } from "../../../database/db-config/data-source";
import { Project } from "../../../database/db-config/entity/Project";

const getAllProjects = async (req: Request, res: Response) => {
  log(req.headers["user-agent"], "admin get all projects");
  try {
    const allUsers = await AppDataSource.getRepository(Project).find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).send(JSON.stringify(error));
  }
};

export default getAllProjects;
