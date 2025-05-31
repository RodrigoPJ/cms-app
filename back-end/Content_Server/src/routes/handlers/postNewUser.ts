import { Request, Response } from "express";
import validateNewUser from "../../utils/validators/validateNewUser";
import { log } from "console";
import { User } from "../../database/db-config/entity/User";
import { AppDataSource } from "../../database/db-config/data-source";
import saveUser from "../../database/controllers/saveUser";

const createNewUser = async (req: Request, res: Response) => {
  log(req.headers["user-agent"]);
  const body = req.body;

  try {
    const validationErrors = await validateNewUser(body);
    if (validationErrors.length > 0) {
      res.status(401).json({ ...validationErrors.map((el) => el.constraints) });
    } else {
      const { firstName, user } = body;
      if (typeof firstName === "string" && typeof user === "string") {
        const savedUser = await saveUser({firstName, user});
        if (savedUser){
          res.status(200).json(savedUser);
        } else {
          res.status(500).send('db could not save')
        }
      } else {
        res.status(400).json({ message: "Bad payload" });
      }
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

export default createNewUser;
