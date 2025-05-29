import { log } from "console";
import { Request, Response } from "express";
import { AppDataSource } from "../db-config/data-source";
import { User } from "../db-config/entity/user";
import { TypeORMError } from "typeorm";
import os from "os";

const healthCheck = async (req: Request, res: Response) => {
  log(req.headers["user-agent"]);
  const health = {
    status: "unknown",
    uptime: `${process.uptime().toFixed(0)}s`,
    timestamp: new Date().toISOString(),
    memory: {
      free: `${(os.freemem() / 1024 / 1024).toFixed(0)} MB`,
      total: `${(os.totalmem() / 1024 / 1024).toFixed(0)} MB`,
    },
    db: "pending",
  };

  try {
    if (AppDataSource.isInitialized) {
      // Do not use on PROD or higher environments because it may cause service disruptions
      if (process.env.environment === "local") {
        log("Disconnecting from database...");
        await AppDataSource.destroy();
        log("is DB Initialised :", AppDataSource.isInitialized);
        log("Conncecting to the database...");
        await AppDataSource.initialize();
      }

      const dataInfo = await AppDataSource.getRepository(User).findAndCount();
      if (dataInfo) {
        log("is DB Initialised :", AppDataSource.isInitialized);
        health.db = AppDataSource.isInitialized ? "working" : "disconnected";
        health.status = "healthy";
        res.status(200).json(health);
      }
    } else {
      res.status(403).send("DB down");
    }
  } catch (error) {
    const typedError = error as any;
    if (typedError["name"] === "TypeORMError") {
      log((error as TypeORMError).stack);
      res.status(503).json((error as TypeORMError).message);
    } else {
      res.status(401).send("not healthy");
    }
  }
};

export default healthCheck;
