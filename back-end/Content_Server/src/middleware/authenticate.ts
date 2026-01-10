import { log } from "console";
import { Request, Response, NextFunction } from "express";

const aunthenticateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  log(req.headers["user-agent"]);
  const cookies = req.cookies;
  try {
    if (cookies["token_bearer"]) {
    const headersCookie = req.headers.cookie;
    log(headersCookie)
    const serverAuth = await fetch("https://localhost:3000/api/auth/authenticate", {
      method: "POST",
      headers: {
        Accept: "Application/json",
        Cookie: headersCookie,
      },
    });
console.log('auth call');

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
  } catch (error) {
    log(error)
  }
};

export default aunthenticateRequest;
