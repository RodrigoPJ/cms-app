import { Request, Response } from "express";
import { log } from "console";
import { AppDataSource } from "../../database/db-config/data-source";
import { UserContent } from "../../database/db-config/entity/UserContent";

const getAllUsers = async(req:Request, res:Response) => {
    log(req.headers["user-agent"]);
    const allUsers = await AppDataSource.getRepository(UserContent).query('SELECT * FROM public."user_content"');
    res.status(200).json(allUsers);

}

export default getAllUsers;