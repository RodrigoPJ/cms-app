import { Request, Response } from "express";
import { log } from "console";
import { AppDataSource } from "../../database/db-config/data-source";
import { User } from "../../database/db-config/entity/User";

const getAllProjects = async(req:Request, res:Response) => {
    log(req.headers["user-agent"]);
    const allUsers = await AppDataSource.getRepository(User).query('SELECT * FROM public."project_item"');
    res.status(200).json(allUsers);

}

export default getAllProjects;