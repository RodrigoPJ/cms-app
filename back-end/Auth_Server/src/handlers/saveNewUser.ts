import { Request, Response } from "express";
import { AppDataSource } from "../db-config/data-source";
import { log } from "console";
import { User } from "../db-config/entity/user";
import validateUser from "../utils/validators/userValidator";
import { Encrypt } from "../utils/encryption/Encrypt";
import saveAccount from "../utils/data/saveAccount";

const saveNewUser = async (req: Request, res: Response) => {
  try {
    const hasjsonheaders = req.headers["content-type"];
    if (!hasjsonheaders?.includes("json") || !req.body)
      res.status(407).send("no json header in request");
    log(req.headers["user-agent"]);
    log(req.body)
    const validatorErrors = await validateUser(req.body);
    if (validatorErrors.length > 0) {
      const displayErrors = { ...validatorErrors.map((el) => el.constraints) };
      res.status(400).json(displayErrors);
    } else {
      const { age, firstName, lastName, password, email } = req.body;
      const existingUser = await AppDataSource.manager.find(User, {
        where: { email: email },
      });
      if (existingUser.length >= 1) {
        res.status(303).send("existing account for that email");
      } else {
        const encryption = Encrypt.encryptpass;
        const encryptedPassword = await encryption(password);
        const user = new User();
        user.age = age;
        user.firstName = firstName;
        user.lastName = lastName;
        user.password = encryptedPassword;
        user.email = email;
        const newAccount = await saveAccount(firstName, email);
        if (newAccount && newAccount.id){
          user.account = newAccount.id
          const accSaved = await AppDataSource.getRepository(User).save(user);          
          res.status(200).json(accSaved);
        }else {
            res.status(500).send('no content account created')
        }
      }
    }
  } catch (error) {
    log(error)  
    res.status(406).json('error in the request');
  }
};

export default saveNewUser;
