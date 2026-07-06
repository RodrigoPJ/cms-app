import { log } from "console";
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";

dotenv.config();

const AUTH_SERVER = process.env.AUTH_SERVER || ''

const aunthenticateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  log(req.headers["user-agent"]);
  const cookies = req.cookies;
  const fetchHeaders: Record<string, string> = {
  Accept: "application/json",
};
  try {
    if (cookies["token_bearer"] && req.headers.cookie) {
    const headersCookie = req.headers.cookie;
    log(headersCookie)
    fetchHeaders["Cookie"] = headersCookie;
    const serverAuth = await fetch(`${AUTH_SERVER}/api/auth/authenticate`, {
      method: "POST",
      headers: fetchHeaders,
    });
    log('auth call');

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
