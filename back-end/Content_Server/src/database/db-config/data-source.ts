import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import dotenv from 'dotenv';
import { ProjectContent } from "./entity/ProjectContent";
import { ProjectItem } from "./entity/ProjectItem";

dotenv.config();

const port = parseInt(process.env.DB_PORT);

export const AppDataSource = new DataSource({
   type: 'postgres',
   host: process.env.DB_HOST,
   port: port,
   username: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME,
   synchronize: true,
   entities: [User, ProjectContent, ProjectItem],
   migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
});
