import { Request, Response } from "express";
import validateNewUser from "../../utils/validators/validateNewUser";
import { log } from "console";
import { User } from "../../database/db-config/entity/User";
import { AppDataSource } from "../../database/db-config/data-source";
import { ProjectList } from "../../database/db-config/entity/ProjectList";
import { v4 as uuid } from 'uuid';

const createNewUser = async (req: Request, res: Response) => {
  const body = req.body;
  log(req.headers["user-agent"]);
  const validationErrors = await validateNewUser(body);
  if (validationErrors.length > 0) {
    res.status(401).json({ ...validationErrors.map((el) => el.constraints) });
  } else {
    const { firstName, user } = body;
    if (typeof firstName === "string" && typeof user === "string") {
      const findDuplicate = await AppDataSource.getRepository(User).find({
        where: {
          user: user
        }
      })
      if ( findDuplicate.length > 0) {
        res.status(401).json({message: `${findDuplicate.length} users with the same mail have been used, rerset your password`})
      return
      }
      const newUser = new User();
      newUser.dateCreated = new Date().toISOString();
      newUser.user = user;
      newUser.userName = firstName;
      newUser.userType = "free";
      const savedUser = await AppDataSource.manager.save(newUser);
      const projectList = new ProjectList();
      projectList.name = `Project list id from ${firstName}`;
      projectList.user =  savedUser.id;
      const savedProjectList = await AppDataSource.manager.save(projectList);
      savedUser.projectListId = savedProjectList;
      const updatedUser = await AppDataSource.manager.save(savedUser);
      res
        .status(200)
        .json({updatedUser, savedProjectList});
    } else {
      res.status(400).json({ message: "Bad payload" });
    }
  }
};

export default createNewUser;
