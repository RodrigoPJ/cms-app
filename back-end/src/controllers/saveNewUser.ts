import { Request, Response } from "express";
import { AppDataSource } from "../db-config/data-source";
import { log } from "console";
import { User } from "../db-config/entity/UserAuth";
import validateUser from "../utils/validators/userValidator";
import { UserAccount } from "../db-config/entity/UserAccount";

const saveNewUser = async (req: Request, res: Response) => {
   const hasjsonheaders = req.headers["content-type"];
  if (!hasjsonheaders?.includes("json") || !req.body) res.status(404).send('no json content');
  log(req.headers["user-agent"]);
  const reqBody = req.body;
  const validatorErrors = await validateUser(reqBody);
  if (validatorErrors.length>0) {
    const displayErrors = {...validatorErrors.map(el=>el.constraints)}
    res.status(400).json(displayErrors);
  }else{
    const user = new User();
    const { age, firstName, lastName, password, email } = reqBody;
    user.age = age;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = password;
    user.email = email;
    const existingUser = await AppDataSource.manager.find(User, {
      where: { email: email },
    });
    if (existingUser.length >= 1) {
      res.status(303).send("existing account for that email");
    } else {
      const newUserAccount = new UserAccount();
      newUserAccount.projects = JSON.stringify([]);
      newUserAccount.type = 'free';
      const manager = AppDataSource.manager;
      const savedAccount = await manager.save(newUserAccount);
      user.account = savedAccount.id;
      const savedData = await manager.save(user);
      

      res.status(200).json({savedData, savedAccount});
    }
  }
};

export default saveNewUser;
