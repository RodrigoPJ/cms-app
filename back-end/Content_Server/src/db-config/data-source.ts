import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserContent } from "../entity/UserContent"
import * as dotenv from 'dotenv';

dotenv.config();

const port = parseInt(process.env.DB_PORT ) as number | undefined;

export const AppDataSource = new DataSource({
   type: 'postgres',
   host: process.env.DB_HOST,
   port: port,
   username: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME,
   synchronize: true,
   entities: [UserContent],
   migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
});
