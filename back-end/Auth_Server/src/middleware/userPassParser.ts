import { log } from "console";
import { Request, Response, NextFunction } from "express";
import validateUserPass from "../utils/validators/userPassValidator";

async function UserPassParser(req: Request, res: Response, next: NextFunction) {
  log(req.headers["user-agent"]);
  const hasjsonheaders = req.headers["content-type"];
  if (hasjsonheaders?.includes("json") && req.body) {
    const validationErrors = await validateUserPass(req.body);
    if (validationErrors.length > 0) {
      const displayErrors = { ...validationErrors.map((el) => el.constraints) };
      res.status(400).json(displayErrors);
    }
    if (
      typeof req.body?.email === "string" &&
      typeof req.body?.password === "string"
    ) {
      next();
    } else {
      res.status(401).send("incorrect credentials");

    }
  } else {
    res.status(400).send("no json content");
  }
}

export default UserPassParser;
