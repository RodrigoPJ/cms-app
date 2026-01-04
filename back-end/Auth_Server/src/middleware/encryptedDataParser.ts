import { log } from "console";
import { Request, Response, NextFunction } from "express";
import validateEncryptedData from "../utils/validators/encryptedDataValidator";

async function encryptedDataParser(req: Request, res: Response, next: NextFunction) {
  log(req.headers["user-agent"]);
  const hasjsonheaders = req.headers["content-type"];
  if (hasjsonheaders?.includes("json") && req.body) {
    const validationErrors = await validateEncryptedData(req.body);
    if (validationErrors.length > 0) {
      const displayErrors = { ...validationErrors.map((el) => el.constraints) };
      res.status(400).json(displayErrors);
    } else {
      if (
        typeof req.body?.data === "string" &&
        typeof req.body?.iv === "string" &&
        typeof req.body?.key === "string"
      ) {
        next();
      } else {
        res.status(401).send("incorrect credentials");
      }
    }
  } else {
    res.status(400).send("no json content");
  }
}

export default encryptedDataParser;
