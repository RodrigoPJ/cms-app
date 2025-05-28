import { Request, Response } from "express";
import { AppDataSource } from "../db-config/data-source";
import { log } from "console";
import { User } from "../db-config/entity/UserAuth";
import validateUser from "../utils/validators/userValidator";
import { UserAccount } from "../db-config/entity/UserAccount";
import { Encrypt } from "../utils/encryption/Encrypt";

const saveNewUser = async (req: Request, res: Response) => {
  try {
    const hasjsonheaders = req.headers["content-type"];
    if (!hasjsonheaders?.includes("json") || !req.body)
      res.status(404).send("no json content");
    log(req.headers["user-agent"]);
    const validatorErrors = await validateUser(req.body);
    if (validatorErrors.length > 0) {
      const displayErrors = { ...validatorErrors.map((el) => el.constraints) };
      res.status(400).json(displayErrors);
    } else {
      const encryption = Encrypt.encryptpass;
      const user = new User();
      const { age, firstName, lastName, password, email } = req.body;
      const encryptedPassword = await encryption(password);
      user.age = age;
      user.firstName = firstName;
      user.lastName = lastName;
      user.password = encryptedPassword;
      user.email = email;
      const existingUser = await AppDataSource.manager.find(User, {
        where: { email: email },
      });
      if (existingUser.length >= 1) {
        res.status(303).send("existing account for that email");
      } else {
        const newUserAccount = new UserAccount();
        newUserAccount.projects = JSON.stringify([]);
        newUserAccount.type = "free";
        const manager = AppDataSource.manager;
        const savedAccount = await manager.save(newUserAccount);
        user.account = savedAccount.id;
        const savedData = await manager.save(user);
        const savedUser = {
          savedEmail: savedData.email,
          account: savedData.account
        };
        res.status(200).json({ savedUser});
      }
    }
  } catch (error) {
    res.status(402).json(error);
  }
};

export default saveNewUser;
