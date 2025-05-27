import 'reflect-metadata';
import { DataSource } from "typeorm";
import { User } from './entity/UserAuth';
import { UserAccount } from './entity/UserAccount';
import dotenv from 'dotenv';

dotenv.config();


const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
   type: 'postgres',
   host: process.env.DB_HOST,
   port: port,
   username: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME,
   synchronize: true,
   entities: [User, UserAccount],
   migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
});
