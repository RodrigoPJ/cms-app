import { log } from "console";
import { Request, Response, NextFunction } from "express";

const aunthenticateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  log(req.headers["user-agent"]);
  const cookies = req.cookies;
  if (cookies["token_bearer"]) {
    const headersCookie = req.headers.cookie;
    const serverAuth = await fetch("http://localhost:3000/auth/authenticate", {
      method: "POST",
      headers: {
        Accept: "Application/json",
        Cookie: headersCookie,
      },
    });

    if (serverAuth.status === 200) {
      const parsedServerRes = await serverAuth.json();
      log(parsedServerRes);
      next();
    } else {
      res.status(401).json({ error: { notAuthentic: true } });
    }
  } else {
    res.status(401).json({ error: { notAuthentic: true } });
  }
};

export default aunthenticateRequest;
