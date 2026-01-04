import { log } from "console";
import dotenv from 'dotenv';
import path from 'path';
import https from 'https';
import fs from 'fs';
import { createDataSource } from "./db-config/data-source";
import { createApp } from "./app";
import { DataBaseParams } from "./utils/types";

const env = process.env.NODE_ENV || 'devlocal';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

console.log(`Environment: ${env}`);

const dbEnv: DataBaseParams = {
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  port: process.env.PORT,
  username: process.env.DB_USER,
  database: process.env.DB_NAME
}

export const AppDataSource = createDataSource(dbEnv);

const app = createApp(process.env.FRONT_URL);
const sslOptions = {
  key: fs.readFileSync(path.resolve(process.cwd(), 'localhost+2-key.pem')),
  cert: fs.readFileSync(path.resolve(process.cwd(), 'localhost+2.pem'))
};

const server = https.createServer(sslOptions, app);

AppDataSource.initialize().then((DataSource) => {
  log('Database connected: ', DataSource.options.type);

  return server.listen(process.env.PORT,()=>{
    log(`Secure server listening on port: ${process.env.PORT}`)
  });
});
