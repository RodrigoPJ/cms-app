import { Request, Response } from "express";
import { AppDataSource } from "../db-config/data-source";
import { log } from "console";
import { User } from "../db-config/entity/user";
import validateUser from "../utils/validators/userValidator";
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
        const rawResponse = await fetch("http://localhost:3001/uiprofile", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            user: user.email,
          }),
        });
        if (rawResponse.status !== 200) {
          res.status(302).send("bad request for uiprofile service");
        } else {
          const parsedUser: any = await rawResponse.json();
          if (parsedUser.id) {
            user.account = parsedUser.id;
            const savedData = await AppDataSource.manager.save(user);
            if (savedData) {
              const savedUser = {
                user: savedData.email,
                firstName: savedData.firstName,
                account: savedData.account,
              };
              res.status(200).json(savedUser);
            } else {
              res.status(402).send("content server couldnt save");
            }
          } else {
            res.status(402).send("content server didnt gave an id");
          }
        }
      }
    }
  } catch (error) {
    res.status(402).json(error);
  }
};

export default saveNewUser;
