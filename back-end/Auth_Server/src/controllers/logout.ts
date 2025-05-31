import { Request, Response } from "express";
import { log } from "console";

const logout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  log(req.headers["user-agent"]);
  if (typeof cookies === "object") {
    const jwtoken: string | undefined = cookies["token_bearer"];
    if (jwtoken) {
      res.clearCookie("token_bearer").status(200).send("logged out");
    } else {
      res.status(404).send('nothing to clear');
    }
  }else {
    res.status(403).send('no cookie');
  } 
};

export default logout;
