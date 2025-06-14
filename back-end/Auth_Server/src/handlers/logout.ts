import { Request, Response } from "express";
import { log } from "console";

const logout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  log(req.headers["user-agent"]);
  if (typeof cookies === "object") {
    const jwtoken: string | undefined = cookies["token_bearer"];
    if (jwtoken) {
      res.clearCookie("token_bearer",  {
          httpOnly: true,
          secure: false, // Set to true **only** if using HTTPS (in dev, keep it false)
          sameSite: "lax", // Or 'none' if secure: true
          maxAge: 86400000, //
        }).status(200).json("logged out");
    } else {
      res.status(200).json({message: 'no cookie found to be be cleared'});
    }
  }else {
    res.status(200).send('no cookie');
  } 
};

export default logout;
