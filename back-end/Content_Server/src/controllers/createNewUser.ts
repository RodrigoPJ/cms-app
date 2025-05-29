import { Request, Response } from "express";
import validateNewUser from "../utils/validators/validateNewUser";
import { log } from "console";
import { UserContent } from "../db-config/entity/UserContent";
import { AppDataSource } from "../db-config/data-source";

const createNewUser = async (req: Request, res: Response) => {
  const body = req.body;
  log(req.headers["user-agent"]);
  const validationErrors = await validateNewUser(body);
  if (validationErrors.length > 0) {
    res.status(401).json({ ...validationErrors.map((el) => el.constraints) });
  } else {
    const { firstName, user } = body;
    if (typeof firstName === "string" && typeof user === "string") {
      const newUser = new UserContent();
      newUser.dateCreated = new Date().toISOString();
      newUser.projects = "[]";
      newUser.user = user;
      newUser.userName = firstName;
      newUser.userType = "free";
      const savedUser = await AppDataSource.getRepository(UserContent).save(
        newUser
      );
      res.status(200).json({id: savedUser.id});
    } else {
      res.status(400).json({ message: "Bad payload" });
    }
  }
};

export default createNewUser;
