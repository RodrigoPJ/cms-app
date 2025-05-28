import { Request, Response } from "express";
import { AppDataSource } from "../db-config/data-source";
import { User } from "../db-config/entity/UserAuth";
import { Encrypt } from "../utils/encryption/Encrypt";

const resetPassword = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (typeof email === "string" && typeof password === "string") {
    const manager = AppDataSource.manager;
    const user = await manager.find(User, {
      where: {
        email: email,
      },
    });
    if (user.length > 1) {
      res.status(401).send("duplicate user");
    } else if (user.length === 1) {
      const encryptedPassword = await Encrypt.encryptpass(password);
      const updated = await manager.update(
        User,
        { id: user[0].id },
        { password: encryptedPassword }
      );
      res.status(200).json({ ...updated });
    } else if (user.length === 0) {
      res.status(404).send("user not found");
    }
  } else {
    res.status(402).send("bad payload");
  }
};

export default resetPassword;
