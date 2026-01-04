import { Request, Response } from "express";
import { log } from "console";

const logout = (req: Request, res: Response) => {
  const cookies = req.cookies;
  log('logout', req.headers["user-agent"]);
  const origin = req.get('Origin');
  log(origin)
  if (typeof cookies === "object") {
    const jwtoken: string | undefined = cookies["token_bearer"];
    if (jwtoken) {
      res.clearCookie("token_bearer",  {
          httpOnly: true,
          secure: true, // Set to true **only** if using HTTPS (in dev, keep it false)
          sameSite: "none", // Or 'none' if secure: true
          maxAge: 86400000, //
        }).status(200).json("logged out");
    } else {
      res.status(200).json({message: 'no valid token found to be be cleared'});
    }
  }else {
    res.status(200).send('no cookies detected');
  } 
};

export default logout;
