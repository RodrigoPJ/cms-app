import { Request, Response } from "express";
import validateNewUser from "../../utils/validators/validateNewUser";
import { log } from "console";
import { UserContent } from "../../database/db-config/entity/UserContent";
import { AppDataSource } from "../../database/db-config/data-source";
import { ProjectList } from "../../database/db-config/entity/ProjectList";

const createNewUser = async (req: Request, res: Response) => {
  const body = req.body;
  log(req.headers["user-agent"]);
  const validationErrors = await validateNewUser(body);
  if (validationErrors.length > 0) {
    res.status(401).json({ ...validationErrors.map((el) => el.constraints) });
  } else {
    const { firstName, user } = body;
    if (typeof firstName === "string" && typeof user === "string") {
      const projectList = new ProjectList();
      projectList.name = firstName;
      const savedProjectList = await AppDataSource.getRepository(
        ProjectList
      ).save(projectList);
      const newUser = new UserContent();
      newUser.dateCreated = new Date().toISOString();
      newUser.user = user;
      newUser.userName = firstName;
      newUser.userType = "free";
      newUser.projects = savedProjectList.id;
      const savedUser = await AppDataSource.getRepository(UserContent).save(
        newUser
      );
      res
        .status(200)
        .json(savedUser);
    } else {
      res.status(400).json({ message: "Bad payload" });
    }
  }
};

export default createNewUser;
