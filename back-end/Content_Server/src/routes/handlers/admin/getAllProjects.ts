import { Request, Response } from "express";
import { log } from "console";
import { AppDataSource } from "../../../database/db-config/data-source";
import { User } from "../../../database/db-config/entity/User";
import { ProjectItem } from "../../../database/db-config/entity/ProjectItem";

const getAllProjects = async (req: Request, res: Response) => {
  log(req.headers["user-agent"], "admin get all projects");
  try {
    const allUsers = await AppDataSource.getRepository(ProjectItem).query(
      'SELECT * FROM public."project_item"'
    );
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).send(JSON.stringify(error));
  }
};

export default getAllProjects;
