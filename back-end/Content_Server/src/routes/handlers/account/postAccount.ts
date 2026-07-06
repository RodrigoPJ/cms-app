import { Request, Response } from "express";
import validateNewAccount from "../../../utils/validators/validateNewAccount";
import { log } from "console";
import createAccount from "../../../database/controllers/account/createAccount";

const createNewAccount = async (req: Request, res: Response) => {
  log(req.headers["user-agent"]);
  const body = req.body;

  try {
    const validationErrors = await validateNewAccount(body);
    if (validationErrors.length > 0) {
      res.status(400).json({ ...validationErrors.map((el) => el.constraints) });
    } else {
      const { userName, name } = body;
      log(body)
      if (typeof userName === "string" && typeof name === "string") {
        const savedAccount = await createAccount({name, userName});
        log('saved user:', savedAccount)
        if (savedAccount){
          res.status(200).json(savedAccount);
        } else {
          res.status(500).send('db could not save')
        }
      } else {
        res.status(400).json({ message: "Bad payload" });
      }
    }
  } catch (error: any) {
    log(error)
    res.status(500).json(error.message || "Unexpected error");
  }
};

export default createNewAccount;
