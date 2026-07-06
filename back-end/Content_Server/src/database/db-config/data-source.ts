import "reflect-metadata"
import { DataSource } from "typeorm"
import { Account } from "./entity/Account"
import dotenv from 'dotenv';
import { Content } from "./entity/Content";
import { Project } from "./entity/Project";

dotenv.config();

const port = parseInt(process.env.DB_PORT || "");

export const AppDataSource = new DataSource({
   type: 'postgres',
   host: process.env.DB_HOST,
   port: port,
   username: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME,
   synchronize: true,
   entities: [Account, Content, Project],
   migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
});
