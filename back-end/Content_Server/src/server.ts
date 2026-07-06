import "dotenv/config";
import { AppDataSource } from "./database/db-config/data-source";
import { log } from "console";
import app from "./app";
import dotenv from "dotenv";
import path from "path";
import https from "https";
import fs from "fs";

dotenv.config();

const PORT: Number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const sslOptions = {
  key: fs.readFileSync(
    path.resolve(process.cwd(), "certificates/localhost+1-key.pem")
  ),
  cert: fs.readFileSync(
    path.resolve(process.cwd(), "certificates/localhost+1.pem")
  ),
};

const server = https.createServer(sslOptions, app);

async function startServer() {
  server.listen(PORT, () => {
    log(`Secure server listening on port: ${process.env.PORT}`);
  });
  const db = await AppDataSource.initialize();
  log("connected to db", db.isInitialized);
}

startServer();
