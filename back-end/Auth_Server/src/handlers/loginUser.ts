import { Request, Response } from "express";
import { AppDataSource } from "../db-config/data-source";
import { User } from "../db-config/entity/user";
import { Encrypt } from "../utils/encryption/Encrypt";
import { log } from "console";

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  log("login");
  const user = await AppDataSource.getRepository(User).find({
    where: {
      email,
    },
  });
  if (user.length > 1) {
    res.status(401).send("user duplicated");
  } else if (user.length === 1) {
    const comparepassword = Encrypt.comparepassword(user[0].password, password);
    if (comparepassword) {
      const token = await Encrypt.generateToken(user[0].email);
      const newUser = {
        account: user[0].account,
        firstName: user[0].firstName,
        user: user[0].email,
      };
      res
        .cookie("token_bearer", token, {
          httpOnly: true,
          secure: false, // Set to true **only** if using HTTPS (in dev, keep it false)
          sameSite: "lax", // Or 'none' if secure: true
          maxAge: 86400000, //
        })
        .status(200)
        .json(newUser);
    } else {
      res.status(401).send("wrong password");
    }
  } else if (user.length === 0) {
    res.status(404).send("user not found");
  }
};

export default loginUser;
